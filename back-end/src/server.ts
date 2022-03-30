import config from 'config';
import app from './index';

const PORT = config.get('PORT');

app.listen(PORT, () => console.log(`API listening on port ${PORT}!`));
