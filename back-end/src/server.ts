import config from 'config';
import IO from './index';

const PORT = config.get('PORT');

IO.listen(PORT, () => console.log(`API listening on port ${PORT}!`));
