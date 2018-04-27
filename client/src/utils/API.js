import axios from 'axios';

export default {

    loadHot: function() {
        return axios.get('http://www.reddit.com/hot.json?')
            .then(data => data.data.data.children.map(data => data.data))
            .catch(err => console.log(err));
    },

    search: function(searchTerm) {
        let concat = searchTerm.replace(/ /g, '+');
        return axios.get(`http://www.reddit.com/search.json?q=${concat}`)
            // .then(res => console.log(JSON.parse(res)))
            .then(data => data.data.data.children.map(data => data.data))
            .catch(err => console.log(err));
    }
};


