import { buildCommonjs } from "./helpers/buildCommonjs.js";

export default buildCommonjs('./src/index.js', ".")( "./dist/data-structures.js" );
