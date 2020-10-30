import { buildCommonjs } from "./helpers/buildCommonjs.js";

export default buildCommonjs('./src/index.js', "./visualizer/")( "./dist/data-structures.js", true );
