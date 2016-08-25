# Simple Carousel Image Slider Directive for AngularJS


Its a simple slider. The images fade in and out. More Animations will be added soon 

Every thing used is angular based. Jquery is not used. 

##Directive

```
angular.module('myApp')..directive('customCarousel', function($timeout,$http,$location) {

    return {
        restrict : 'A',
        transclude : true,
        scope : {
          sliderImages : '=',
          slideInAnim : '=',
          sliderOutAnim : '='
        },
        
        link: function(scope, element, attrs) {
          
            scope.sliderImages.forEach(function(image) { // make every image invisible
              image.anim = 'hide-img'; 
            });

            scope.sliderImages[0].anim = scope.slideInAnim;
            scope.currentIndex = 0;

            var addClass = function() {
                scope.sliderImages.forEach(function(image) {
                    image.anim = 'hide-img'; // make every image invisible
                });
      
                if(scope.currentIndex===0)
                    scope.sliderImages[scope.sliderImages.length-1].anim = scope.sliderOutAnim;
                else 
                    scope.sliderImages[scope.currentIndex-1].anim = scope.sliderOutAnim;
          
                scope.sliderImages[scope.currentIndex].anim = scope.slideInAnim;
                scope.$apply();
            };

            var nextImg = function() {
                if(scope.currentIndex === scope.sliderImages.length-1)
                    scope.currentIndex = 0;
                else
                    scope.currentIndex++;
                addClass();
            };

            var prevImg = function() {
                if(scope.currentIndex === 0)
                    scope.currentIndex = scope.sliderImages.length-1;
                else
                    scope.currentIndex--;
                
                addClass();
            };
            
            var animate = function() {
                $timeout(function() {
                    nextImg();
                    animate();
                }, 5000, false);
            };
            animate();
        },
        templateUrl: 'carousel.html'
    };
});
```

## Directive HTML

```
<ul class="list-style">
	<li ng-repeat="img in sliderImages">
		<div class="img-container">
	  		<img ng-src="{{img.url}}" class="slider-dimen" ng-class="img.anim"/>
	  	</div>
	</li>
</ul>
```

## Include In Controller

```
<div custom-carousel class="col-xs-12" slider-images="sliderImgUrls" slide-in-anim="'fadeinAnim'" slider-out-anim="'fadeOutAnim'"></div>
```

## Style CSS

```
.slider-dimen {
    height: auto;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}

.list-style {
	list-style: none;
	padding: 0;
}

.images-container {
	margin-left: auto;
	margin-right: auto;
	width: 100%;
}

.hide-img {
    display: none;
}

.img-container {
	width : 100%;
	position : relative;
}

.fadeinAnim {
    font-size: 21px;
    text-align: center;
    display: block;
    position: absolute;
    z-index: 1;
    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
         -o-animation: fadein 2s; /* Opera < 12.1 */
            animation: fadein 2s;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

.fadeOutAnim {
    font-size: 21px;
    text-align: center;
    position: absolute;
    z-index: -1;
    -webkit-animation: fadeout 2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadeout 2s; /* Firefox < 16 */
        -ms-animation: fadeout 2s; /* Internet Explorer */
         -o-animation: fadeout 2s; /* Opera < 12.1 */
            animation: fadeout 2s;
}

@keyframes fadeout {
    from { opacity: 1; }
    to   { opacity: 0; }
}

/* Firefox < 16 */
@-moz-keyframes fadeout {
    from { opacity: 1; }
    to   { opacity: 0; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadeout {
    from { opacity: 1; }
    to   { opacity: 0; }
}

/* Internet Explorer */
@-ms-keyframes fadeout {
    from { opacity: 1; }
    to   { opacity: 0; }
}

/* Opera < 12.1 */
@-o-keyframes fadeout {
    from { opacity: 1; }
    to   { opacity: 0; }
}

```

## Controller

```
$scope.sliderImgUrls = [
    {'url':'img/1.jpg'},
    {'url':'img/2.jpg'},
    {'url':'img/3.jpg'},
    {'url':'img/4.jpg'}];
    
```
