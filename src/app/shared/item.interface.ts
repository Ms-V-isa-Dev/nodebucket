/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 10/10/2020
 * Description: Item interface ts
 */

import { ObjectUnsubscribedError } from 'rxjs';

export interface Item {
  _id: string;
  text: string;
}
