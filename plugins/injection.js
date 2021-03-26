export default ({ app }, inject) => {
    inject('contentByName', (from, nameComponent) => {
        let filteredbloks = from.filter(function (item) { return item.component === `${nameComponent}` })
        return filteredbloks.length > 1 ? filteredbloks : filteredbloks[0]

    }),
        inject('customClass', (elementName, style) => {
            if ($nuxt.$route.name.includes(elementName) || app.store.state.values.nameElement.includes(elementName)) {
                return style
            }
        })
}