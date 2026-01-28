const java_block = Codecs.java_block

const SimpleCodec = new Codec('simple_codec', {
  name: 'Simple Codec',
  remember: true,
  extension: 'json',
  load_filter: {
    type: 'json',
    extensions: ['json'],
    condition(model) {
      return model.groups;
    },
    
  },
  compile: (options)=> {
		if (options === undefined) options = {}

		var raw = options.raw;
		options.raw = true;
		var model = java_block.compile(options)
		model.loader = "fancydoors:group";
		if (raw) {
			return model;
		} else {
			return autoStringify(model)
		}
	},
  parse: java_block.parse,
})

export default SimpleCodec;


