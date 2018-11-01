(function() {
    'use strict';
    
    angular
        .module('app', [])
        .controller('PlotGeneratorController', PlotGeneratorController);
        
    function PlotGeneratorController($http) {
        var vm = this;
        vm.generateCharacter = generateCharacter;
        vm.generateStory = generateStory;
        vm.clear = clear;
        vm.loadData = loadData;
        vm.dataSets = [];
        
        vm.name = "";
        vm.data = "-";
        vm.story = " ";
        vm.item = " ";
        
        
        var dataAddress = "src/";
        var dataFiles = ["roles", "entities", "methods", "objectives", "attributes"];
        var loaded = -10;

        function generateCharacter() {
            if (!checkLoaded()) {
            }else {
                var role = randomize(0);
                var attribute = randomize(4);
                vm.data = "Enter our brave main character: " + 
                    attribute + " " + role + " " + vm.name + ".";
            }
        }
        
        function generateStory() {
            if (!checkLoaded()) {
            }else {
                var who = randomize(1);
                who = who.charAt(0).toUpperCase() + who.slice(1);
                var method = randomize(2);
                var what = randomize(3);
                vm.story = who + " trying to " + what + " " + method + ".";
                
            }
        }
        
        function clear() {
            vm.story = " ";
            vm.data = " ";
        }
        
        function loadData() {
            vm.data = "Load in progress..."
            loaded = 1;
            for (var x = 1; x <= dataFiles.length; x++){
                vm.dataSets.push([]);
                urlLoader(x, dataFiles[x - 1]);
                loaded -= x;
            }
        }
        
        function urlLoader(id, urlSuffix) {
            return $http.get(dataAddress + urlSuffix + ".json")
                .then(function(response) {   
                    vm.dataSets[id - 1] = response.data[urlSuffix];
                    loaded += id;
                    if (loaded === 1){
                        vm.data = " ";
                    }
                }, 
                function(response) {
                    return "error";
                });
        }
        
        function randomize(listId) {
            return vm.dataSets[listId][Math.round(Math.random() * (vm.dataSets[listId].length - 1))].value;
        }
        
        function checkLoaded() {
            if (loaded < -9) {
                loadData();
                return 0;
            }
            return 1;
        }
    }

})();

