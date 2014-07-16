describe('factory: PadlockFactory', function() {

  var $httpBackend, $http, $rootScope, PadlockFactory;

  beforeEach(function() {
    module('ps.padlock');
  });

  beforeEach(function() {
    inject(function(_$httpBackend_, _$http_, _$rootScope_, _PadlockFactory_) {
      $httpBackend = _$httpBackend_;
      $http = _$http_;
      $rootScope = _$rootScope_;
      PadlockFactory = _PadlockFactory_;
    });
    spyOn($rootScope, '$broadcast').andCallThrough();
  });

  it('can get an instance of my factory', inject(function(PadlockFactory) {
    expect(PadlockFactory).toBeDefined();
  }));

  it("should allow to be extended via config an object", inject(function(PadlockFactory) {
    spyOn(PadlockFactory, 'options');
    // Set fake options
    var opts = { authFailed: 'FAILED', authSuccess: 'SUCCESS' };

    PadlockFactory.options(opts);
    expect(PadlockFactory.options).toHaveBeenCalled();
  }));

  it("should broadcast event on a 401 http header", inject(function() {
    var callback = function(data, status) {
      expect(status).toBe(401);
    };
    $httpBackend.whenGET('/restricted-access').respond(401);
    $http.get('/restricted-access').success(callback);
    $httpBackend.flush();
    expect($rootScope.$broadcast).toHaveBeenCalledWith('Padlock:unauthorized', jasmine.any(Object));
    $rootScope.$broadcast.reset();
  }));

  it("should broadcast event on a 200 http header if PadlockOptions.authSuccess is set", inject(function() {
    var callback = function(data, status) {
      expect(status).toBe(200);
    };
    $httpBackend.whenGET('/user-is-authed').respond(200);
    $http.get('/user-is-authed').success(callback);
    $httpBackend.flush();
    expect($rootScope.$broadcast).toHaveBeenCalledWith('Padlock:authorized', jasmine.any(Object));
    $rootScope.$broadcast.reset();
  }));

  it("should NOT broadcast event on a 200 http header if PadlockOptions.authSuccess is set to false", inject(function() {
      PadlockFactory.options({
          authSuccess: false
      });
      var callback = function(data, status) {
        expect(status).toBe(200);
      };
      $httpBackend.whenGET('/user-is-authed').respond(200);
      $http.get('/user-is-authed').success(callback);
      $httpBackend.flush();
      expect($rootScope.$broadcast).not.toHaveBeenCalledWith('Padlock:authorized', jasmine.any(Object));
      $rootScope.$broadcast.reset();
  }));

});