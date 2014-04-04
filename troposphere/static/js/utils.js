/** 
 * Global utilities file.  You can call these from anythwere!
 */
define(['controllers/notifications'], function(notifications) {

var Utils = {};

//Why is this not already in date... 
Date.prototype.format = function(format) {
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //24-hour
    "H+" : this.getHours(),   //24-hour
    "I+" : (this.getHours() > 12) ? this.getHours()-12 : this.getHours() ,   //12-hour
    "m+" : this.getMinutes(), //minute
    "p" : (this.getHours() > 12) ? 'PM' : 'AM', //AM/PM
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
  }

  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length==1 ? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
}
Utils.minutes_to_pretty_time = function(minutes, precision) {
    return Utils.seconds_to_pretty_time(minutes*60, precision)
};
Utils.seconds_to_pretty_time = function(seconds, precision) {
    // Precision refers to how many subdivisions of time to return
    var pretty_time = "";
    var units_used = 0;
    var ip_units = 0;
    var interval = 0;
    var p_i;
    var periods = [ 
        {'sec' : 31536000,     'unit' : ' year'},
        {'sec' : 2592000,     'unit' : ' month'},
        {'sec' : 86400,     'unit' : ' day'},
        {'sec' : 3600,         'unit' : ' hour'},
        {'sec' : 60,         'unit' : ' minute'},
        {'sec' : 1,         'unit' : ' second'}];

    if (precision == undefined)
        precision = 1;
        
    if (seconds < 1)
        return '0 seconds';

    for (var i = 0, l = periods.length; i < l; i++) {
        p_i = periods[i];
        interval = Math.floor(seconds / p_i.sec);
        ip_units = interval + p_i.unit;
        if (interval >= 1) {
            units_used++;
            pretty_time += (pretty_time.length > 1) ? ', ' + ip_units : ip_units;
            if (interval > 1) {
                pretty_time += 's';
            }
            seconds = (seconds - (interval * p_i.sec));
            if (precision == units_used || i == l) {
                return pretty_time;
            }
        }
    }
    
};

Utils.relative_time = function(date_obj) {
    var now = new Date();
    var seconds = Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()) - date_obj) / 1000);

    var time = Utils.seconds_to_pretty_time(seconds, 1);

    return time + ' ago';
};

Utils.evil_chris_time_parse = function(str_date) {
  if(str_date && (typeof str_date == 'object') && str_date.length > 19) {
    return Date.parse(str_date.substring(0,19)).setTimezoneOffset(0);
  }  
};

Utils.hide_all_help = function() {
    $('[id^=help_]').popover('hide');
};

Utils.update_weather = function() {

    $.ajax({
        url: '/api/v1/provider/' + Atmo.profile.get('selected_identity').get('provider_id') + '/occupancy/', 
        type: 'GET',
        success: function(response_text) {

            var occupancy = Math.round(((response_text[0]["total"] - response_text[0]["remaining"]) / response_text[0]["total"]) * 100);
            var weather_classes = ['sunny', 'cloudy', 'rainy', 'stormy'];
            var weather = '';

            if(occupancy > 85)
                weather = weather_classes[3]
            else if(occupancy > 60)
                weather = weather_classes[2]
            else if(occupancy > 35)
                weather = weather_classes[1]
            else if(occupancy >= 0)
                weather = weather_classes[0]

            if (!$('#weather_report').hasClass(weather)) {
                $.each(weather_classes, function(k, v) {
                    $('body').removeClass(v);
                });
                $('#weather_report').addClass(weather);

                // Hardcoded for now, replace when we have identities in backbone models
                $('#weather_report').html(function() {
                    var content = (Atmo.profile.get('selected_identity').get('provider_id') == 2) ? 'OpenStack' : 'Eucalyptus';
                    content += ' is at ' + occupancy + '% capacity.<br /> The forecast is '+weather+'.';
                    return content;
                });
            }

        }, 
        error: function() {
            var weather_classes = ['sunny', 'cloudy', 'rainy', 'stormy'];
            weather = 'rainy';
            if (!$('#weather_report').hasClass(weather)) {
                $.each(weather_classes, function(k, v) {
                    $('body').removeClass(v);
                });
                $('#weather_report').addClass(weather);
            }
            $('#weather_report').html('Atmosphere could not determine the capacity and forecast for this cloud.');
        }
    });
};

// case-insensitive Levenshtein Distance as defined by http://en.wikipedia.org/wiki/Levenshtein_distance
Utils.levenshtein_distance= function(s, t) {
    var len_s = s.length, len_t = t.length, cost = 0;
    s = s.toLowerCase();
    t = t.toLowerCase();

    if (s[0] != t[0])
        cost = 1;

    if (len_s == 0)
        return len_t;
    else if (len_t == 0)
        return len_s;
    else
        return Math.min(
            Utils.levenshtein_distance(s.substr(1), t) + 1, 
            Utils.levenshtein_distance(s, t.substr(1)) + 1, 
            Utils.levenshtein_distance(s.substr(1), t.substr(1)) + cost
        );
};
Utils.getCookie = function(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
Utils.post_to_url = function (path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
};

Utils.get_profile = function() {
  profile = new Atmo.Models.Profile();
  var model_name = profile.get('model_name');
  var params = {};
  console.log(params);
  console.log(model_name);
  var url = profile.get('api_url')
    + "/" + model_name;
  console.log(url);
  $.ajax({
    type: "GET",
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    url: url,
    data: params,
    success: function(data, textStatus, jqXHR) {
      console.log(data);
      console.log(textStatus);
      console.log(jqXHR);
      $.each(data, function(key, value) {
        profile.set(key, value);
      });
      console.log("processing in Utils.get_profile.success");
      //options.success(profile);
    },
    error: function(data, textStatus, jqXHR) {
      console.log(data);
      console.log(textStatus);
      console.log(jqXHR);
      console.log("processing in Utils.get_profile.success");
      //options.error('failed to ' + method
      //              + model_name
      //              + "="
      //              + id);
    },
  });
  return profile;
}

// deprecated.   Use Atmo.profile.get('selected_identity')
Utils.current_credentials = function() {
  //console.log("current_credentials");
  return { "provider_id": Atmo.profile.get('selected_identity').get('provider_id'),
           "identity_id": Atmo.profile.get('selected_identity').id
         };
}

// To show people how much money they've saved by using Atmosphere!

Number.prototype.toCurrencyString = function() {
    return this.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/, '$1,');    
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
Utils.filterInt = function (value) {
    if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
        return Number(value);
    return NaN;
}

return Utils;

});
