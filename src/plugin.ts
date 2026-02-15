
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
        
        deletables.push();

    },
    onunload() {
        // Delete actions etc. when reloading or uninstalling the plugin
        for (let deletable of deletables) {
            deletable.delete();
        }
        deletables.empty();
    }
}

BBPlugin.register('animation_test', plugin)



