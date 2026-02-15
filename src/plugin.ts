import ExtendedCodec from "./extended_codec";

const deletables: Deletable[] = [];

class EventCallback implements Deletable {
    event: EventName;
    cb: any;

    constructor(event: EventName, cb: any) {
        this.event = event;
        this.cb = cb;

        Blockbench.on(event, cb);
    }

    delete(): void {
        Blockbench.removeListener(this.event, this.cb)
    }
}

const plugin: PluginOptions = {
    title: 'Dynamo Library',
    author: 'ageuxo',
    icon: 'icon.png',
    version: '1.0.0',
    description: 'Adds a custom model format for animating models in Minecraft',
    variant: 'both',
    min_version: '5.0.0',
    has_changelog: true,
    onload() {

        console.log("Dynamo Library loaded");
        var extendedJava = createExtendedModelFormat();

        const exportAction = new Action('export_dynamo_model', {
            name: 'Export Dynamo Model',
            icon: 'icon.png',
            category: 'file',
            condition: () => Project.format.id == extendedJava.id,
            click: () => {
                ExtendedCodec.export();
            }
        });
        ExtendedCodec.export_action = exportAction;

        MenuBar.addAction(exportAction, 'file.export');

        deletables.push(extendedJava, exportAction, ExtendedCodec);

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

function createExtendedModelFormat(): ModelFormat {
    const extendedFormat = new ModelFormat('dynamo_extended', {
        id: 'dynamo_extended',
        name: 'Extended DynamoLib model',
        icon: 'change_history',
        category: 'minecraft',
        target: 'Minecraft: Java Edition',
        render_sides: 'front',
        model_identifier: false,
        parent_model_id: true,
        vertex_color_ambient_occlusion: true,
        rotate_cubes: true,
        rotation_limit: true,
        rotation_snap: false,
        optional_box_uv: true,
        uv_rotation: true,
        java_cube_shading_properties: true,
        java_face_properties: true,
        cullfaces: true,
        animated_textures: true,
        select_texture_for_particles: true,
        texture_mcmeta: true,
        display_mode: true,
        texture_folder: true,
        pbr: true,
        codec: ExtendedCodec,
        animation_mode: true,
        animation_files: true
    });

    return extendedFormat;
}


