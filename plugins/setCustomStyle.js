export default {
    data() {
        return {
            style: Object,
        }
    },
    methods: {
        setStyle(blok) {
            function styleValue(item) {
                return Object.keys(item).filter(function (key) { return key.includes("_") && !key.includes('uid') }).reduce(function (obj, key) {
                    let newkey = key.substring(key.indexOf("_") + 1)
                    obj[newkey] = obj[newkey] ? `${obj[newkey].trim()} ${item[key]}` : item[key];
                    return obj;
                }, {})
            }

            if (typeof blok === 'object' && blok) {
                this.style = styleValue(blok)


            }
            if (blok instanceof Array && blok) {
                for (let index = 0; index < blok.length; ++index) {
                    this.style[index] = styleValue(blok[index])
                }
            }

        },

    },
    created() {
        this.setStyle(this.content)
    },
}

