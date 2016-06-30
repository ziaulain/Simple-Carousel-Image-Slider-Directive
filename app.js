angular.module('simpleSlider', []);

function MainCtrl($scope) {
  $scope.sliderImgUrls = [
    {'url':'img/1.jpg','anim':'fadeOutAnim'},
    {'url':'img/2.jpg','anim':'fadeinAnim'},
    {'url':'img/3.jpg','anim':'fadeOutAnim'},
    {'url':'img/4.jpg','anim':'fadeOutAnim'}];
}


angular.module('simpleSlider').directive('customCarousel', function($timeout,$http,$location) {

    return {
        restrict : 'A',
        transclude : true,
        scope : {
          sliderImages : '=',
          slideInAnim : '=',
          sliderOutAnim : '='
        },
        
        link: function(scope, element, attrs) {
          
            scope.sliderImages.forEach(function(image) {
              image.anim = 'hide-img'; // make every image invisible
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