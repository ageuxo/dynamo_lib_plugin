
const deletables: Deletable[] = [];

const plugin: PluginOptions = {
    title: 'Animation Test',
    author: 'ageuxo',
    icon: 'icon.png',
    version: '1.0.0',
    description: 'Animation Test',
    variant: 'both',
    min_version: '5.0.0',
    has_changelog: false,
    onload() {

        const format = new ModelFormat("test_format", {
            name: "Test Format",
            animation_mode: true,
        })

        const codec = new Codec("test_codec", {
            name: "Test Codec"
        })
        
        deletables.push(format);

    },
    onunload() {
        // Delete actions etc. when reloading or uninstalling the plugin
        for (let deletable of deletables) {
            deletable.delete();
        }
        deletables.empty();
    }
}

BBPlugin.register('dynamo_lib', plugin)



