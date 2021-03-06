var $ = require("jquery");
var React = require("react");
var TimerMixin = require("react-timer-mixin");
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Navigation = ReactRouter.Navigation;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

var moment = require("moment");
moment().utc();

var storageAffix = "newtab-";
var weatherApiBase = "https://api.openweathermap.org/data/2.5/weather?APPID=7b49265e4a56d70167022401a00887fa";

function getData(name) {
    var data = localStorage[storageAffix + name];
    return data != undefined ? JSON.parse(data) : null;
}

function setData(name, data) {
    delData(name);
    localStorage[storageAffix + name] = JSON.stringify(data);
}

function delData(name) {
    localStorage.removeItem(storageAffix + name);
}

var Settings = React.createClass({

    mixins: [Navigation],

    getInitialState: function() {
        return {
            name: 'Minh',
            city: 'Auto',
            showWeather: true,
            showTemperature: true,
            showWindSpeed: false,
            isDarkTheme: true,
            isEnglish: true,
        };
    },

    componentWillMount: function() {
        var data = getData("user");
        if (data != null) {
            this.setState(data);
        }
    },

    handleClick: function(e) {
        setData("user", this.state);
    },

    handleChange: function(event) {
        var data = {
            name: event.target.id == 'name' ?  event.target.value : this.state.name,
            city: event.target.id == 'city' ?  event.target.value : this.state.city,
            showWeather: event.target.id == 'showWeather' ?  event.target.checked : this.state.showWeather,
            showTemperature: event.target.id == 'showTemperature' ?  event.target.checked : this.state.showTemperature,
            showWindSpeed: event.target.id == 'showWindSpeed' ?  event.target.checked : this.state.showWindSpeed,
            isDarkTheme: event.target.id == 'isDarkTheme' ?  event.target.checked : this.state.isDarkTheme,
            isEnglish: event.target.id == 'isEnglish' ? event.target.checked : this.state.isEnglish,
        };

        this.setState(data);
    },

    toggleWeather: function() {
        this.setState({showWeather: !this.state.showWeather});
    },

    toggleTemperature: function() {
        this.setState({showTemperature: !this.state.showTemperature});
    },

    toggleWindSpeed: function() {
        this.setState({showWindSpeed: !this.state.showWindSpeed});
    },

    toggleTheme: function() {
        this.setState({isDarkTheme: !this.state.isDarkTheme}, this.toggleCssStyle);
    },

    toggleLanguage: function() {
        this.setState({isEnglish: !this.state.isEnglish});
    },

    toggleCssStyle: function() {
        if (this.state.isDarkTheme != true) {
            $('link[href="src/dist/dark.css"]').attr('href','src/dist/light.css');
            // $("body").css('background', 'white');
            // $("section").css('color', 'black');
            // $("input[type='text']").css('color', 'black');
            // $("input[type='text']:hover, input[type='text']:focus").css('border-color', "black");
            // $("header").css('color', 'black');
            // $(".form-group").css('border-left', '2px solid black');
            // $(".form-group-seamless").css('border', 'none');
            // $("a.button").css('color', 'black');
            // $("a.button:hover").css('color', 'white', 'background', 'black');
            // $("select").css('border', '2px solid black');
            // $("select").css('color', 'black');
            // $("hr").css('background', 'black');
            // $("a.edit").css('color', 'black');
            // $(".onoffswitch-inner:before, .onoffswitch-inner:after").css('color', 'black');
            // $(".onoffswitch-switch").css('color', 'white');
        }
        else {
            $('link[href="src/dist/light.css"]').attr('href','src/dist/dark.css');
            // $("body").css('background', 'black');
            // $("section").css('color', 'white');
            // $("input[type='text']").css('color', 'white');
            // $("input[type='text']:hover, input[type='text']:focus").css('border-color', "white");
            // $("header").css('color', 'white');
            // $(".form-group").css('border-left', '2px solid white');
            // $(".form-group-seamless").css('border', 'none');
            // $("a.button").css('color', 'white');
            // $("a.button:hover").css('color', 'white', 'background', 'white');
            // $("select").css('border', '2px solid white');
            // $("select").css('color', 'white');
            // $("hr").css('background', 'white');
            // $("a.edit").css('color', 'white');
            // $(".onoffswitch-inner:before, .onoffswitch-inner:after").css('color', 'white');
            // $(".onoffswitch-switch").css('color', 'black');
        }
    },

    render: function() {
        // console.log('this.state.isDarkTheme = ' + this.state.isDarkTheme)
        if (this.state.isEnglish) {
            return (
                <div id="settings">
                    <header>
                        <h1>Settings</h1>
                        <p className="lead">You may use the fields below to personalize your NewTab.</p>
                        <hr/>
                    </header>
                    <section className="settings-area">
                        <h2>Basic</h2>
                        <div className="form-group">
                            <div className="form-item">
                                <label htmlFor="name">Your name</label>
                                <input id="name" value={this.state.name} onChange={this.handleChange} 
                                    placeholder="Your name." type="text"/>
                            </div>
                            <div className="form-item form-space-after">
                                <label htmlFor="city">Location</label>
                                <input id="city" value={this.state.city} onChange={this.handleChange} 
                                    placeholder="City to provide a forecast for." type="text"/>
                            </div>
                        </div>
                    </section>
                    <section className="settings-area">
                        <h2>Options</h2>
                        <div className="form-group">
                            <h3>Weather</h3>
                            <div className="form-item form-space-after">
                                <label htmlFor="showWeather">Show Weather</label>
                                <div className="onoffswitch">
                                    <input className="onoffswitch-checkbox" id="showWeather" 
                                        checked={this.state.showWeather} type="checkbox"/>
                                    <label onClick={this.toggleWeather} className="onoffswitch-label" 
                                        htmlFor="myonoffswitch">
                                        <span className="onoffswitch-inner"></span>
                                        <span className="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-item form-space-after">
                                <label htmlFor="showTemperature">Show Forecast</label>
                                <div className="onoffswitch">
                                    <input className="onoffswitch-checkbox" id="showTemperature" 
                                        checked={this.state.showTemperature} type="checkbox"/>
                                    <label onClick={this.toggleTemperature} className="onoffswitch-label" 
                                        htmlFor="myonoffswitch">
                                        <span className="onoffswitch-inner"></span>
                                        <span className="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-item">
                                <label htmlFor="showWindSpeed">Show Wind Speed</label>
                                <div className="onoffswitch">
                                    <input className="onoffswitch-checkbox" id="showWindSpeed" checked={this.state.showWindSpeed} type="checkbox"/>
                                    <label onClick={this.toggleWindSpeed} className="onoffswitch-label" htmlFor="myonoffswitch">
                                        <span className="onoffswitch-inner"></span>
                                        <span className="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group form-group-seamless">
                            <h3>General</h3>
                            <div className="form-item form-space-after">
                                <label htmlFor="isDarkTheme">Theme</label>
                                <div className="onoffswitch">
                                    <input className="onoffswitch-checkbox" id="isDarkTheme" checked={this.state.isDarkTheme} type="checkbox"/>
                                    <label onClick={this.toggleTheme} className="onoffswitch-label" htmlFor="myonoffswitch">
                                        <span className="onoffswitch-inner onoffswitch-theme-inner"></span>
                                        <span className="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-item form-space-after">
                                <label htmlFor="isEnglish">Language</label>
                                <div className="onoffswitch">
                                    <input className="onoffswitch-checkbox" id="isEnglish" checked={this.state.isEnglish} type="checkbox"/>
                                    <label onClick={this.toggleLanguage} className="onoffswitch-label" htmlFor="myonoffswitch">
                                        <span className="onoffswitch-inner onoffswitch-language-inner"></span>
                                        <span className="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="settings-area">
                        <h2>Actions</h2>
                        <div className="form-group">
                            <a href="#" className="button" onClick={this.handleClick}>Save</a>
                        </div>
                    </section>
                </div>
            );
        }
        else {
            return (
                <div id="settings">
                    <header>
                        <h1>Cài đặt</h1>
                        <p className="lead">Thay đổi các mục sau đây theo ý thích của bạn.</p>
                        <hr/>
                    </header>
                    <section className="settings-area">
                        <h2>Cơ bản</h2>
                        <div className="form-group">
                            <div className="form-item">
                                <label htmlFor="name">Tên bạn</label>
                                <input id="name" value={this.state.name} onChange={this.handleChange} 
                                    placeholder="Your name." type="text"/>
                            </div>
                            <div className="form-item form-space-after">
                                <label htmlFor="city">Địa chỉ</label>
                                <input id="city" value={this.state.city} onChange={this.handleChange} 
                                    placeholder="City to provide a forecast for." type="text"/>
                            </div>
                        </div>
                    </section>
                    <section className="settings-area">
                        <h2>Các lựa chọn</h2>
                        <div className="form-group">
                            <h3>Thời tiết</h3>
                            <div className="form-item form-space-after">
                                <label htmlFor="showWeather">Hiện thời tiết</label>
                                <div className="onoffswitch">
                                    <input className="onoffswitch-checkbox" id="showWeather" 
                                        checked={this.state.showWeather} type="checkbox"/>
                                    <label onClick={this.toggleWeather} className="onoffswitch-label" 
                                        htmlFor="myonoffswitch">
                                        <span className="onoffswitch-inner"></span>
                                        <span className="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-item form-space-after">
                                <label htmlFor="showTemperature">Dự báo thời tiết</label>
                                <div className="onoffswitch">
                                    <input className="onoffswitch-checkbox" id="showTemperature" 
                                        checked={this.state.showTemperature} type="checkbox"/>
                                    <label onClick={this.toggleTemperature} className="onoffswitch-label" 
                                        htmlFor="myonoffswitch">
                                        <span className="onoffswitch-inner"></span>
                                        <span className="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-item">
                                <label htmlFor="showWindSpeed">Hiển thị sức gió</label>
                                <div className="onoffswitch">
                                    <input className="onoffswitch-checkbox" id="showWindSpeed" checked={this.state.showWindSpeed} type="checkbox"/>
                                    <label onClick={this.toggleWindSpeed} className="onoffswitch-label" htmlFor="myonoffswitch">
                                        <span className="onoffswitch-inner"></span>
                                        <span className="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group form-group-seamless">
                            <h3>Tổng quan</h3>
                            <div className="form-item form-space-after">
                                <label htmlFor="isDarkTheme">Nền</label>
                                <div className="onoffswitch">
                                    <input className="onoffswitch-checkbox" id="isDarkTheme" checked={this.state.isDarkTheme} type="checkbox"/>
                                    <label onClick={this.toggleTheme} className="onoffswitch-label" htmlFor="myonoffswitch">
                                        <span className="onoffswitch-inner onoffswitch-theme-inner">{this.toggleCssStyle}</span>
                                        <span className="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-item form-space-after">
                                <label htmlFor="isEnglish">Ngôn ngữ</label>
                                <div className="onoffswitch">
                                    <input className="onoffswitch-checkbox" id="isEnglish" checked={this.state.isEnglish} type="checkbox"/>
                                    <label onClick={this.toggleLanguage} className="onoffswitch-label" htmlFor="myonoffswitch">
                                        <span className="onoffswitch-inner onoffswitch-language-inner"></span>
                                        <span className="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="settings-area">
                        <h2>Quẩy thui</h2>
                        <div className="form-group">
                            <a href="#" className="button" onClick={this.handleClick}>Lưu</a>
                        </div>
                    </section>
                </div>
            );
        }
    }
});

var Background = React.createClass({

    mixins: [TimerMixin],

    getInitialState: function() {
        return {
            delay: 7000,
            loaded: false,
            src: ''
        };
    },

    componentDidMount: function() {
        console.log('Background loaded.');
        this.initImage(); // load first time without delay
        this.setTimer();
    },

    componentWillUnmount: function() {
        console.log('bg unmounted');
    },

    initImage: function() {
        $('img').fadeOut(1000, function() {
            //preload image
            var img = new window.Image();
            img.onload = this.onImageLoad;
            img.src = this.randomImage();
        }.bind(this));
    },

    setTimer: function() {
        this.setInterval(
            function () { 
                this.initImage(); 
            }.bind(this),
            this.state.delay
        );
    },

    onImageLoad: function(event) {
        this.setState({loaded: true, src: event.target.src});
        $('img').stop().fadeIn(500);
    },

    random: function() {
        return Math.floor(Math.random() * (16)) + 1;
    },

    randomImage : function() {
        var imgSrc = "https://res.cloudinary.com/minhld/image/upload/c_scale,g_center,h_" 
        + (window.screen.height-100) 
        + ",w_" + window.screen.width 
        + "/v1609858465/newtab/" 
        + this.random() + ".png";
        return imgSrc;
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.loaded && nextState.src != null ;//nextState.loaded;
    },

    render: function() {
        return <img id="background" src={this.state.src}/>;
    }
});

var Clock = React.createClass({
    mixins: [TimerMixin],

    getInitialState: function() {
        return {
            currentTime: moment().format("HH:mm:ss")
        };
    },

    componentDidMount: function() {
        console.log('Clock loaded.');
        this.setTimer();
    },

    checkTime: function(i) {
        if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    },

    tick: function() {
        this.setState({
            currentTime: moment().format("HH:mm:ss")
        });
    },

    setTimer: function() {
        this.setInterval(
          function () { this.tick(); }.bind(this),
          500
        );
    },

    render: function() {
        var userData = getData("user");
        if (userData.isEnglish) {
            return (
                <div id="clock">
                    <div id="dial">{this.state.currentTime}</div>
                    <span id="greeting">Hello {this.props.name}</span> <Link className="edit" to={'/settings'}>(settings)</Link>
                </div>
    
            );
        }
        else {
            return (
                <div id="clock">
                    <div id="dial">{this.state.currentTime}</div>
                    <span id="greeting">Chào {this.props.name}</span> <Link className="edit" to={'/settings'}>(cài đặt)</Link>
                </div>
    
            );
        }
    }
})

var Weather = React.createClass({
    mixins: [TimerMixin],

    getInitialState: function() {
        return {
            storageId: 'weather',
            lastUpdated: null,
            weather: {
                wind: 0,
                temp: 0
            },
            ms: true,
            celsius: true
        };
    },

    handleTempClick: function() {
        this.setState({celsius: !this.state.celsius});
    },

    handleWindClick: function() {
        this.setState({ms: !this.state.ms});
    },

    componentDidMount: function() {
        console.log('Weather loaded.');
        this.setTimer();
    },

    setTimer: function() {
        this.getWeather();
        this.setInterval(
          function () { this.getWeather(); }.bind(this),
          60000
        );
    },

    getDecimalsBetween: function(current, target, delay, callback) {
        return new Promise(function(resolve) {
            var arr = [];
            var runningValue = current;

            var index = 0;
            while (parseFloat(runningValue) != parseFloat(target))
            {
                var difference = ( parseFloat(runningValue) - parseFloat(target) ).toFixed(1)
                var tick = 0;
                if (parseFloat(difference) > 0) {
                    // 20.0 -> 19.0 = 1
                    // colder than before -0.1
                    runningValue = (parseFloat(runningValue) - parseFloat(0.1)).toFixed(1);
                } else if (parseFloat(difference) < 0) {
                    // 19.0 -> 29.0 = -1
                    // warmer than before +0.1
                    runningValue = (parseFloat(runningValue) + parseFloat(0.1)).toFixed(1);
                }
                
                arr[index] = parseFloat(runningValue).toFixed(1);
                index ++;
            }

            resolve(arr);
        });
    },

    setDeceleratingTimeout: function(callback, factor, times) {
      var internalCallback = function( t, counter )
      {
        return function()
        {
          if ( --t > 0 )
          {
            window.setTimeout( internalCallback, ++counter * factor );
            callback();
          }
        }
      }( times, 0 );

      window.setTimeout( internalCallback, factor );
    },

    getWeather() {
        console.log('Fetching forecast');
        var userData = getData("user");
        var url;

        if (userData.city.toLowerCase() == 'auto')
        {
            //TODO: Save the current position instead of polling it constantly
            navigator.geolocation.getCurrentPosition(function (loc) {console.log(loc)}, function () {}, {});
            //The working next statement.
            navigator.geolocation.getCurrentPosition(function (loc) {
                console.log(loc)
                url = weatherApiBase + '&lat=' + loc.coords.latitude + '&lon=' + loc.coords.longitude + '&units=metric';
                this.getWeatherForUrl(url);
                console.log(url);
            }.bind(this))
        } else {
            url = weatherApiBase + '&q=' + userData.city + '&units=metric';
            this.getWeatherForUrl(url);
            console.log(url);
        }
    },

    getWeatherForUrl: function(url) {
        var now = moment();
        var userData = getData("user");
        var weatherData = getData(this.state.storageId);
        if (weatherData == null 
            || userData == null
            || userData.city != weatherData.weather.city
            || now.diff(moment(weatherData.lastUpdated), 'minutes') >= 1) {
                $.get(url, function(result) {

                var data = {
                    weather: { 
                        temp: parseFloat((Math.round(result.main.temp * 10) / 10).toFixed(1)),
                        wind: result.wind.speed,
                        city: result.name
                    },
                    lastUpdated: now
                };
                
                if (this.state.weather.temp != data.weather.temp)
                {
                    this.getDecimalsBetween(this.state.weather.temp, data.weather.temp, 50).then(function(arr) {
                        var startPos = (arr.length - arr.length / 15).toFixed(0);
                        this.setDeceleratingTimeout(function() {
                            var newData = data;
                            newData.weather.temp = arr[startPos];
                            this.setState(newData);
                            startPos++;
                        }.bind(this), 50, arr.length - startPos);
                    }.bind(this));
                }

                this.setState( data );
                setData(this.state.storageId,  data );
            }.bind(this))
        } else {
            this.setState( weatherData );
        }
    },

    getWindText: function(ms) {
        var userData = getData("user");
        if (userData.isEnglish) {
            if (ms >= 12)
                return 'Hurricane force';
            if (ms >= 11)
                return 'Violent storm';
            if (ms >= 10)
                return 'Whole gale';
            if (ms >= 9)
                return 'Severe gale';
            if (ms >= 8)
                return 'Gale';
            if (ms >= 7)
                return 'Moderate gale';
            if (ms >= 6)
                return 'Strong breeze';
            if (ms >= 5)
                return 'Fresh breeze';
            if (ms >= 4)
                return 'Moderate breeze';
            if (ms >= 3)
                return 'Gentle breeze';
            if (ms >= 2)
                return 'Light breeze';
            if (ms >= 1)
                return 'Light air';
            if (ms >= 0)
                return 'Calm';
        }
        else {
            if (ms >= 12)
                return 'Siêu bão';
            if (ms >= 11)
                return 'Gió bão cực mạnh';
            if (ms >= 10)
                return 'Gió bão dữ dội';
            if (ms >= 9)
                return 'Gió bão';
            if (ms >= 8)
                return 'Gió rất mạnh';
            if (ms >= 7)
                return 'Gió mạnh hơn';
            if (ms >= 6)
                return 'Gió mạnh';
            if (ms >= 5)
                return 'Gió mạnh vừa phải';
            if (ms >= 4)
                return 'Gió vừa phải';
            if (ms >= 3)
                return 'Gió nhẹ';
            if (ms >= 2)
                return 'Gió nhẹ vừa phải';
            if (ms >= 1)
                return 'Gió rất nhẹ';
            if (ms >= 0)
                return 'Êm đềm';
        }
    },

    render: function() {

        var userData = getData("user");

        var temperature = userData.showTemperature ? (
            this.state.celsius ? (
                    <div className="temperature">
                        <div id="temp">
                            {this.state.weather.temp} 
                            <span><button id="tempUnit" onClick={this.handleTempClick}>&deg;C</button></span>
                        </div>
                        <span id="location">{this.state.weather.city}</span>
                    </div>
                ) : (
                    <div className="temperature">
                        <div id="temp">
                            {(this.state.weather.temp * 1.8 + 32).toFixed(1)} 
                            <span><button id="tempUnit" onClick={this.handleTempClick}>&#8457;</button></span>
                        </div>
                        <span id="location">{this.state.weather.city}</span>
                    </div>
                )
            ) : null;

        var wind = userData.showWindSpeed ? (
            this.state.ms ? (
                    <div className="wind">
                        <div id="wind">
                            {this.state.weather.wind} 
                            <span><button id="windUnit" onClick={this.handleWindClick}>m/s</button></span>
                        </div>
                        <span id="windText">{this.getWindText(this.state.weather.wind)}</span>
                    </div>
                ) : (
                    <div className="wind">
                        <div id="wind">
                            {(this.state.weather.wind * 3.6).toFixed(1)}
                            <span><button id="windUnit" onClick={this.handleWindClick}>km/h</button></span>
                        </div>
                        <span id="windText">{this.getWindText(this.state.weather.wind)}</span>
                    </div>
                )
            ) : null;

        return (
            <div id="weather">
                {temperature}
                {wind}                
            </div>
        );
    }
});

var App = React.createClass({

    getInitialState: function() {
        return {
            storageId: "user" 
        };
    },

    render: function() {
        var storedData = getData(this.state.storageId);
        let engine = "Google";
        let action = "https://google.com/search";
        const icon = `https://external-content.duckduckgo.com/ip3/${
            action.split("://")[1].split("/")[0]
        }.ico`;
        if (storedData == null) {
            return <Settings />;
        } else {
            var weather = storedData.showWeather ? <Weather city={storedData.city}/> : null;

            return (
                <section>
                    <aside>
                        <Clock name={storedData.name}/>
                        {weather}
                    </aside>

                    <center>
                        <form action={action} id="search-bar-container">
                            <input
                                autoFocus
                                type="search"
                                name="q"
                                placeholder={`Search ${engine} or type a URL`}
                                autoComplete="off"
                            />
                            <button type="submit">
                                <img src={icon} className="icon" alt={`${engine} icon`} />
                            </button>
                        </form>
                    </center>

                    <svg id="loading" height="32" width="32">
                        <polygon points="1,16 16,1 16,16" style={{ fill: 'transparent', stroke:'white', strokeWidth: 2}} />
                        <polygon points="16,16, 16,31 31,16" style={{ fill: 'transparent', stroke:'white', strokeWidth: 2}} />
                    </svg>

                    <Background />
                </section>
            );
        }
    }
});

React.render((
  <Router>
    <Route path="/" component={App}/>
    <Route path="/settings" component={Settings}/>
  </Router>
), document.body)