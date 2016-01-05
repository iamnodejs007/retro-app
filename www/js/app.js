"use strict";

angular.module("retro", ["ionic", "ngCordova", "ngCordovaOauth", "ngStorage", "auth0", "angular-jwt"]);
"use strict";

angular.module("retro").constant("DEV_CFG", {
    protocol: "https",
    url: "reactive-retro.herokuapp.com",
    port: 80
});
"use strict";

angular.module("retro").config(["authProvider", function (authProvider) {
    authProvider.init({
        domain: "reactive-retro.auth0.com",
        clientID: "ucMSnNDYLGdDBL2uppganZv2jKzzJiI0",
        loginState: "home"
    });
}]).run(["auth", "$localStorage", "$rootScope", "$state", "jwtHelper", function (auth, $localStorage, $rootScope, $state, jwtHelper) {
    auth.hookEvents();

    var refreshingToken = null;
    $rootScope.$on("$locationChangeStart", function () {
        var token = $localStorage.token;
        var refreshToken = $localStorage.refreshToken;
        var profile = $localStorage.profile;

        if (!token) {
            return;
        }

        if (!jwtHelper.isTokenExpired(token)) {
            if (!auth.isAuthenticated) {
                auth.authenticate(profile, token);
            }
        } else {
            if (refreshToken) {
                if (refreshingToken === null) {
                    refreshingToken = auth.refreshIdToken(refreshToken).then(function (idToken) {
                        $localStorage.token = idToken;
                        auth.authenticate(profile, idToken);
                    })["finally"](function () {
                        refreshingToken = null;
                    });
                }
                return refreshingToken;
            } else {
                $state.go("home");
            }
        }
    });
}]);
"use strict";

angular.module("retro").run(["$ionicPlatform", function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {
            window.StatusBar.styleDefault();
        }
    });
}]);
"use strict";

angular.module("retro").config(["$ionicConfigProvider", "$urlRouterProvider", "$stateProvider", function ($ionicConfigProvider, $urlRouterProvider, $stateProvider) {

    $ionicConfigProvider.views.swipeBackEnabled(false);

    $urlRouterProvider.otherwise("/");

    $stateProvider.state("home", {
        url: "/",
        templateUrl: "index",
        controller: "HomeController"
    }).state("create", {
        url: "/create",
        templateUrl: "createchar",
        controller: "CreateCharacterController",
        data: { requiresLogin: true }
    }).state("player", {
        url: "/player",
        templateUrl: "player",
        controller: "PlayerController",
        data: { requiresLogin: true }
    }).state("changeclass", {
        url: "/changeclass",
        templateUrl: "changeclass",
        controller: "ClassChangeController",
        data: { requiresLogin: true }
    }).state("inventory", {
        url: "/inventory",
        templateUrl: "inventory",
        controller: "InventoryController",
        data: { requiresLogin: true }
    }).state("inventory.armor", {
        url: "/armor",
        views: {
            "armor-tab": {
                templateUrl: "inventory-tab-armor"
            }
        },
        data: { requiresLogin: true }
    }).state("inventory.weapons", {
        url: "/weapons",
        views: {
            "weapons-tab": {
                templateUrl: "inventory-tab-weapons"
            }
        },
        data: { requiresLogin: true }
    }).state("inventory.items", {
        url: "/items",
        views: {
            "items-tab": {
                templateUrl: "inventory-tab-items"
            }
        },
        data: { requiresLogin: true }
    }).state("options", {
        url: "/options",
        templateUrl: "options",
        data: { requiresLogin: true }
    }).state("explore", {
        url: "/explore",
        templateUrl: "explore",
        controller: "ExploreController",
        data: { requiresLogin: true }
    });
}]);
"use strict";

angular.module("retro").constant("CLASSES", {
    Cleric: "Clerics specialize in healing their companions.",
    Fighter: "Fighters specialize in making their enemies hurt via physical means.",
    Mage: "Mages specialize in flinging magic at their enemies -- sometimes multiple at once!"
});
"use strict";

angular.module("retro").constant("OAUTH_KEYS", {
    google: "195531055167-99jquaolc9p50656qqve3q913204pmnp.apps.googleusercontent.com",
    reddit: "CKzP2LKr74VwYw",
    facebook: "102489756752863"
});
"use strict";

angular.module("retro").constant("MAP_STYLE", [{
    featureType: "water",
    elementType: "geometry",
    stylers: [{
        visibility: "on"
    }, {
        color: "#aee2e0"
    }]
}, {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [{
        color: "#abce83"
    }]
}, {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [{
        color: "#769E72"
    }]
}, {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#7B8758"
    }]
}, {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [{
        color: "#EBF4A4"
    }]
}, {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{
        visibility: "simplified"
    }, {
        color: "#8dab68"
    }]
}, {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{
        visibility: "simplified"
    }]
}, {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#5B5B3F"
    }]
}, {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [{
        color: "#ABCE83"
    }]
}, {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [{
        visibility: "off"
    }]
}, {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{
        color: "#A4C67D"
    }]
}, {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{
        color: "#9BBF72"
    }]
}, {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{
        color: "#EBF4A4"
    }]
}, {
    featureType: "transit",
    stylers: [{
        visibility: "off"
    }]
}, {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{
        visibility: "on"
    }, {
        color: "#87ae79"
    }]
}, {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [{
        color: "#7f2200"
    }, {
        visibility: "off"
    }]
}, {
    featureType: "administrative",
    elementType: "labels.text.stroke",
    stylers: [{
        color: "#ffffff"
    }, {
        visibility: "on"
    }, {
        weight: 4.1
    }]
}, {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#495421"
    }]
}, {
    featureType: "administrative.neighborhood",
    elementType: "labels",
    stylers: [{
        visibility: "off"
    }]
}]);
"use strict";

angular.module("retro").controller("ClassChangeController", ["$scope", "Player", "CLASSES", "ClassChangeFlow", function ($scope, Player, CLASSES, ClassChangeFlow) {
    $scope.player = Player.get();
    $scope.CLASSES = CLASSES;
    $scope.ClassChangeFlow = ClassChangeFlow;

    Player.observer.then(null, null, function (player) {
        return $scope.player = player;
    });
}]);
"use strict";

angular.module("retro").controller("CreateCharacterController", ["$scope", "NewHero", "CLASSES", "AuthFlow", "$localStorage", function ($scope, NewHero, CLASSES, AuthFlow, $localStorage) {
    $scope.NewHero = NewHero;
    $scope.CLASSES = CLASSES;
    $scope.baseProfessions = ["Cleric", "Mage", "Fighter"];

    $scope.create = function () {
        var hero = _.merge(NewHero, $localStorage);
        AuthFlow.login(hero);
    };
}]);
"use strict";

angular.module("retro").controller("ExploreController", ["$scope", "$ionicLoading", "Player", "LocationWatcher", function ($scope, $ionicLoading, Player, LocationWatcher) {

    // http://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates

    $scope.mapCreated = function (map) {
        $scope.map = map;
        var position = LocationWatcher.current();
        $scope.drawMe(position);
        $scope.centerOn(position);
        $scope.drawHomepoint(Player.get().homepoint);
        $scope.findMe();
    };

    $scope.drawHomepoint = function (coords) {
        $scope.homepoint = new google.maps.Marker({
            position: new google.maps.LatLng(coords.lat, coords.lon),
            map: $scope.map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                strokeColor: "#00ff00",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#00aa00",
                fillOpacity: 1,
                scale: 5
            }
        });
    };

    $scope.drawMe = function (coords) {
        $scope.curPos = new google.maps.Marker({
            position: new google.maps.LatLng(coords.latitude, coords.longitude),
            map: $scope.map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                strokeColor: "#0000ff",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#0000aa",
                fillOpacity: 1,
                scale: 5
            }
        });

        var affectRadius = new google.maps.Circle({
            fillColor: "#ff00ff",
            strokeColor: "#ff00ff",
            strokeWeight: 1,
            radius: 50,
            map: $scope.map
        });

        affectRadius.bindTo("center", $scope.curPos, "position");
    };

    $scope.findMe = function () {
        LocationWatcher.watch.then(null, null, function (coords) {
            $scope.centerOn(coords);
        });
    };

    $scope.centerOn = function (coords) {
        if (!$scope.map) {
            return;
        }

        var position = new google.maps.LatLng(coords.latitude, coords.longitude);

        $scope.map.setCenter(position);

        $scope.curPos.setPosition(position);

        //socket.emit('nearby', {name: Player.get().name, latitude: coords.latitude, longitude: coords.longitude}, (err, success) => {
        //    console.log(err, JSON.stringify(success));
        //});
    };
}]);
"use strict";

angular.module("retro").controller("HomeController", ["$scope", "LocationWatcher", "Auth", function ($scope, LocationWatcher, Auth) {
    $scope.auth = Auth;
}]);
"use strict";

angular.module("retro").controller("InventoryController", ["$scope", "Player", "EquipFlow", function ($scope, Player, EquipFlow) {
    $scope.player = Player.get();
    Player.observer.then(null, null, function (player) {
        return $scope.player = player;
    });
    $scope.isEmpty = _.isEmpty;

    $scope.EquipFlow = EquipFlow;
}]);
"use strict";

angular.module("retro").controller("MenuController", ["$scope", "$state", function ($scope, $state) {
    $scope.menu = [{ icon: "ion-person", name: "Player", state: "player" }, { icon: "ion-earth", name: "Explore", state: "explore" }, { icon: "ion-briefcase", name: "Inventory", state: "inventory" }, { icon: "ion-gear-b", name: "Options", state: "options" }];

    $scope.travel = function (state) {
        $state.go(state);
    };

    $scope.$root.$on("$stateChangeSuccess", function (event, toState) {
        $scope.$root.hideMenu = toState.name === "home" || toState.name === "create";
    });
}]);
"use strict";

angular.module("retro").controller("PlayerController", ["$scope", "$state", "Player", function ($scope, $state, Player) {
    $scope.player = Player.get();
    Player.observer.then(null, null, function (player) {
        return $scope.player = player;
    });
    $scope.isEmpty = _.isEmpty;

    $scope.go = function (to) {
        $state.go(to);
    };
}]);
"use strict";

angular.module("retro").directive("colorText", function () {
    return {
        restrict: "E",
        template: "\n                <span ng-class=\"{assertive: value < 0, balanced: value > 0}\">{{preText}} {{value}}</span>\n            ",
        link: function (scope, elem, attrs) {
            scope.preText = attrs.preText;
            attrs.$observe("value", function (val) {
                return scope.value = val;
            });
        }
    };
});
"use strict";

angular.module("retro").directive("map", ["MAP_STYLE", "$cordovaToast", "Google", function (MAP_STYLE, $cordovaToast, Google) {
    return {
        restrict: "E",
        scope: {
            onCreate: "&"
        },
        link: function ($scope, $element) {

            if (!Google || !Google.maps) {
                $cordovaToast.showLongBottom("Could not reach google.");
                return;
            }

            // TODO also hit google places for a 25mile radius once upon map creation
            // this is the available list of places in the game

            // TODO store a home point separate from login point, but when creating a character set it to their current location
            // make an option to let them set it to their current point
            var init = function () {
                var mapOptions = {
                    center: new Google.maps.LatLng(32.3078, -64.7505),
                    zoom: 17,
                    mapTypeId: Google.maps.MapTypeId.ROADMAP,
                    draggable: false,
                    minZoom: 17,
                    maxZoom: 17,
                    styles: MAP_STYLE,
                    mapTypeControlOptions: { mapTypeIds: [] },
                    overviewMapControl: false,
                    streetViewControl: false,
                    zoomControl: false
                };

                var map = new Google.maps.Map($element[0], mapOptions);

                $scope.onCreate({ map: map });

                Google.maps.event.addDomListener($element[0], "mousedown", function (e) {
                    e.preventDefault();
                    return false;
                });
            };

            if (document.readyState === "complete") {
                init();
            } else {
                Google.maps.event.addDomListener(window, "load", init);
            }
        }
    };
}]);
"use strict";

angular.module("retro").service("Auth", ["$localStorage", "$state", "auth", "AuthFlow", function ($localStorage, $state, auth, AuthFlow) {

    var localAuth = {
        login: function () {
            auth.signin({
                authParams: {
                    scope: "openid offline_access email",
                    device: "Mobile device"
                }
            }, function (profile, token, accessToken, state, refreshToken) {
                $localStorage.profile = profile;
                $localStorage.token = token;
                $localStorage.refreshToken = refreshToken;

                AuthFlow.tryAuth();
            }, function (err) {
                console.log("failed", JSON.stringify(err));
            });
        }
    };

    return localAuth;
}]);
"use strict";

angular.module("retro").service("AuthFlow", ["$q", "$ionicHistory", "$cordovaToast", "$localStorage", "$state", "Player", "LocationWatcher", "socket", function ($q, $ionicHistory, $cordovaToast, $localStorage, $state, Player, LocationWatcher, socket) {
    var flow = {
        toPlayer: function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go("player");
        },
        tryAuth: function () {
            var fail = function () {
                return $state.go("create");
            };

            if ($localStorage.profile.user_id) {
                // jshint ignore:line
                flow.login(_.clone($localStorage), true).then(null, fail);
            } else {
                fail();
            }
        },
        login: function (NewHeroProto) {
            var swallow = arguments[1] === undefined ? false : arguments[1];

            var defer = $q.defer();

            var NewHero = {
                name: NewHeroProto.name,
                profession: NewHeroProto.profession,
                user_id: NewHeroProto.profile.user_id,
                token: NewHeroProto.token
            };

            console.log(JSON.stringify(NewHero));

            var currentLocation = LocationWatcher.current();
            if (!currentLocation) {
                return $cordovaToast.showLongBottom("No current location. Is your GPS on?");
            }

            NewHero.homepoint = { lat: currentLocation.latitude, lon: currentLocation.longitude };

            socket.emit("login", NewHero, function (err, success) {
                if (err) {
                    defer.reject();
                } else {
                    defer.resolve();
                    Player.set(success.player);
                    flow.toPlayer();
                }

                if (!swallow) {
                    var msgObj = err ? err : success;
                    $cordovaToast.showLongBottom(msgObj.msg);
                }
            });

            return defer.promise;
        }
    };
    return flow;
}]);
"use strict";

angular.module("retro").service("ClassChangeFlow", ["$cordovaToast", "$state", "Player", "socket", function ($cordovaToast, $state, Player, socket) {
    return {
        change: function (newProfession) {

            var player = Player.get();

            var opts = { name: player.name, newProfession: newProfession };
            socket.emit("classchange", opts, function (err, success) {
                var msgObj = err ? err : success;
                $cordovaToast.showLongBottom(msgObj.msg);

                if (success) {
                    Player.set(success.player);
                    $state.go("player");
                }
            });
        }
    };
}]);
"use strict";

angular.module("retro").service("EquipFlow", ["$cordovaToast", "$state", "Player", "socket", function ($cordovaToast, $state, Player, socket) {
    return {
        equip: function (newItem) {

            var player = Player.get();

            var opts = { name: player.name, itemId: newItem.itemId };
            socket.emit("equip", opts, function (err, success) {
                var msgObj = err ? err : success;
                $cordovaToast.showLongBottom(msgObj.msg);

                if (success) {
                    Player.set(success.player);
                    $state.go("player");
                }
            });
        }
    };
}]);
"use strict";

angular.module("retro").service("Google", function () {
    return window.google;
});
"use strict";

angular.module("retro").service("LocationWatcher", ["$q", function ($q) {

    var defer = $q.defer();

    var error = function () {
        console.log("GPS turned off, or connection errored.");
    };

    var currentCoords = {};

    var watcher = {
        current: function () {
            return currentCoords;
        },
        start: function () {
            navigator.geolocation.getCurrentPosition(function (position) {
                currentCoords = position.coords;
                defer.notify(currentCoords);
            }, error, { timeout: 10000 });

            navigator.geolocation.watchPosition(function (position) {
                currentCoords = position.coords;
                defer.notify(currentCoords);
            }, error, { timeout: 30000 });
        },

        watch: defer.promise
    };

    watcher.start();

    return watcher;
}]);
"use strict";

angular.module("retro").service("NewHero", function () {
    return {
        profession: "Fighter"
    };
});
"use strict";

angular.module("retro").service("Player", ["$q", function ($q) {
    //var clamp = (min, cur, max) => Math.max(min, Math.min(max, cur));

    var defer = $q.defer();

    var player = {
        name: "Seiyria",
        homepoint: {
            lat: 44.0329402,
            lon: -88.558683
        },
        unlockedProfessions: ["Cleric", "Fighter", "Mage"],
        professionLevels: {
            Fighter: 1
        },
        profession: "Fighter",
        stats: {
            str: 10,
            agi: 10,
            int: 10,
            luk: 1,

            gold: 100,
            xp: {
                cur: 100,
                max: 1000
            },
            hp: {
                cur: 100,
                max: 1000
            },
            mp: {
                cur: 300,
                max: 500
            }
        },
        equipment: {
            weapon: {
                type: "weapon",
                name: "Knife",
                stats: {
                    str: 1,
                    int: -1
                }
            },
            armor: {
                type: "armor",
                name: "Shirt",
                weight: 1,
                stats: {
                    agi: 2
                }
            }
        },
        inventory: [{
            type: "weapon",
            name: "Dagger",
            stats: {
                str: 2
            }
        }, {
            type: "weapon",
            name: "Club",
            stats: {
                str: 3,
                agi: -1
            }
        }, {
            type: "weapon",
            name: "Staff",
            stats: {
                int: 2
            }
        }, {
            type: "weapon",
            name: "Main Gauche",
            stats: {
                str: 2,
                agi: 1
            }
        }, {
            type: "weapon",
            name: "Glaive",
            stats: {
                str: 2,
                agi: 4
            }
        }, {
            type: "armor",
            name: "Chainmail",
            weight: 2,
            stats: {
                agi: 3,
                str: 1
            }
        }, {
            type: "armor",
            name: "Fullplate",
            weight: 3,
            stats: {
                agi: -3,
                str: 4
            }
        }]
    };

    var functions = {
        calc: {
            stat: function (stat) {
                return _.reduce(player.equipment, function (prev, item) {
                    return prev + (item.stats[stat] || 0);
                }, 0);
            }
        }
    };

    return {
        observer: defer.promise,
        apply: function () {
            defer.notify(player);
        },
        set: function (newPlayer) {
            player = newPlayer;
            _.merge(player, functions);
            defer.notify(player);
        },
        get: function () {
            return player;
        }
    };
}]);
"use strict";

angular.module("retro").service("socketCluster", ["$window", function ($window) {
    return $window.socketCluster;
}]).service("socket", ["DEV_CFG", "socketCluster", function (DEV_CFG, socketCluster) {
    return socketCluster.connect({ protocol: DEV_CFG.protocol, hostname: DEV_CFG.url, port: DEV_CFG.port });
}]);