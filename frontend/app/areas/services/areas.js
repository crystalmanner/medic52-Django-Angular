angular.module('app.services')
    .service('AreaService', ['$http', '$q', '$window', '$intercom', '$log', 'LS', 'CONFIG', 'ApiService', function ($http, $q, $window, $intercom, $log, LS, CONFIG, ApiService) {

        var service = {
            fetchAll: function (chunk, page, text, predicate, direction) {
                var d = $q.defer();

                predicate = predicate || 'area_name';
                direction = direction || false;

                $http.get(ApiService.base() + CONFIG.API_URL + '/areas/',
                    {
                        params: {
                            chunk: chunk,
                            offset: (page - 1) * chunk,
                            search:text,
                            order_by:predicate,
                            order_by_direction: direction?'desc':'asc'
                        }
                    })
                    .success(function (response, status, headers) {
                        d.resolve(response);
                    })
                    .error(function (response, status, headers, config, errors) {
                        d.reject(response);
                    });

                return d.promise;
            },

            update: function (id, name) {
                var d = $q.defer();

                var params = {
                    'area_name': name
                };

                $http.put(ApiService.base() + CONFIG.API_URL + '/areas/' + id + '/', params)
                    .success(function (response, status, headers) {
                        d.resolve(response.data);
                    })
                    .error(function (response, status, headers, config, errors) {
                        d.reject(response);
                    });

                return d.promise;
            },

            add: function (name) {
                var d = $q.defer();
                var params = {
                    'area_name': name
                };

                $http.post(ApiService.base() + CONFIG.API_URL + '/areas/', params)
                    .success(function (response, status, headers) {
                        d.resolve(response.data);
                    })
                    .error(function (response, status, headers, config, errors) {
                        d.reject(response);
                    });

                return d.promise;
            },


            fetch: function (id) {
                var d = $q.defer();

                $http.get(ApiService.base() + CONFIG.API_URL + '/areas/' + id + '/')
                    .success(function (response, status, headers) {
                        d.resolve(response);
                    })
                    .error(function (response, status, headers, config, errors) {
                        d.reject(response);
                    });

                return d.promise;
            },

            remove: function (id) {
                var d = $q.defer();

                var params = {
                };

                $http.delete(ApiService.base() + CONFIG.API_URL + '/areas/' + id + '/', params)
                    .success(function (response, status, headers) {
                        d.resolve(response.data);
                    })
                    .error(function (response, status, headers, config, errors) {
                        d.reject(response);
                    });

                return d.promise;
            }
        };

        return service;
    }]);


