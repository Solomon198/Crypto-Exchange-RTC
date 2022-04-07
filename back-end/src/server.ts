/*
  This script starts the server on PORT specified on environment configuration
 */

import config from 'config';
import IO from './index';

// get port from env config.
const PORT = config.get('PORT');

IO.listen(PORT, () => console.log(`API listening on port ${PORT}!`));
