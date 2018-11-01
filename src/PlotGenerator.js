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
        vm.getStory = getStory;
        vm.getData = getData;
        vm.getItem = getItem;
        vm.loadData = loadData;
        vm.dataSets = [];
        
        vm.name = "";
        vm.data = "-";
        vm.story = " ";
        vm.item = " ";
        
        var dataAddress = "src/";
        var dataFiles = ["roles", "entities", "methods", "objectives", "attributes"];
        
        var loaded = 0;

        function generateCharacter() {
            var role = randomize(0);
            var attribute = randomize(4);
            vm.data = "Enter our brave main character: " + 
                attribute + " " + role + " " + vm.name + ".";
        }
        
        function generateStory() {
            if (!loaded) {
                loadData();
                vm.story = " ";
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
        }
        
        function getStory() {
            return vm.story;
        }
        
        function getData() {
            return vm.data;
        }

        function getItem() {
            return vm.item;
        }        
        
        function loadData() {
            vm.data = "Load in progress..."
            for (var x = 0; x < dataFiles.length; x++){
                vm.dataSets.push([]);
                urlLoader(x, dataFiles[x]);
            }
            loaded = 1;
            vm.data = " ";
        }
        
        function urlLoader(id, urlSuffix) {
            return $http.get(dataAddress + urlSuffix + ".json")
                .then(function(response) {   
                    vm.dataSets[id] = response.data[urlSuffix];
                }, 
                function(response) {
                    return "error";
                });
        }
        
        function randomize(listId) {
            return vm.dataSets[listId][Math.round(Math.random() * (vm.dataSets[listId].length - 1))].value;
        }
    }

})();

