const java_block: Codec = Codecs.java_block;

export default function createExtendedCodec() {
  return new Codec('dynamo_extended', {
    name: 'Dynamo Extended Java Block Codec',
    remember: true,
    extension: 'json',
    load_filter: {
      type: 'json',
      extensions: ['json'],
      condition(model: { groups?: any; }) {
        return model.groups;
      },
    },
    compile: (options) => {
      if (options === undefined) options = {}
      var exportRaw: boolean = options.raw;
      var model = java_block.compile(options)
      model.loader = "fancydoors:group";
      if (exportRaw) {
        return model;
      } else {
        return autoStringify(model)
      }
    },
    parse: java_block.parse,
  })
}