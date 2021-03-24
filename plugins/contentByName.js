export default {
    methods: {
        contentByName(from, nameComponent) {
            let filteredbloks = from.filter(function (item) { return item.component === `${nameComponent}` })
            return filteredbloks.length > 1 ? filteredbloks : filteredbloks[0]
        }
    }
}