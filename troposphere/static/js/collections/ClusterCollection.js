import Backbone from "backbone";
import Cluster from "models/Cluster";
import globals from "globals";

export default Backbone.Collection.extend({
    model: Cluster,

    url: globals.API_V2_ROOT + "/sahara_cluster",

    parse: function(response) {
        this.meta = {
            count: response.count,
            next: response.next,
            previous: response.previous
        };
        return response.results;
    }

});
