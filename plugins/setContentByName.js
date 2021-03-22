export default {
    methods: {
        contentByName(nameComponent) {
            let filteredbloks = this.content.body.filter(function (item) { return item.component === `${nameComponent}` })
            return filteredbloks.length > 1 ? filteredbloks : filteredbloks[0]
        }
    }
}