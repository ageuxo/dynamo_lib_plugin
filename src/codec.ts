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
      var model = java_block.compile({ raw: true })
      model.loader = "fancydoors:group";
      if (options.raw) {
        return model;
      } else {
        return autoStringify(model)
      }
    },
    parse: java_block.parse,
  })
}