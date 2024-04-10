/* eslint-disable import-helpers/order-imports */
import { resolve } from 'node:path';
import { addAlias } from 'module-alias';

addAlias('@', resolve(process.env.NODE_ENV === 'development' ? 'src' : 'dist'));
