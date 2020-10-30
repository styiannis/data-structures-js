import cleanup from 'rollup-plugin-cleanup';
import resolve from '@rollup/plugin-node-resolve';
import visualizer from 'rollup-plugin-visualizer';

export function buildCommonjs(input_file, output_folder) {

    return function (filename, visualize) {

        const plugins = [ resolve({ customResolveOptions: { moduleDirectory: 'node_modules' } }), cleanup() ];

        if (visualize) {
            plugins.push(visualizer({ title: filename, filename: output_folder + filename + '.html', }));
        }

        return {
            input: input_file,
            output: [{ format: 'cjs', file: filename }],
            plugins: plugins,
        };
    }
}