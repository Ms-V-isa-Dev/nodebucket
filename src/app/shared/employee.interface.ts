/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 10/10/2020
 * Description: Employee interface ts to hold and export employee array
 */

import { Item } from './item.interface'; // import over the item interface

export interface Employee {
  empId: string;
  todo: Item[]; // todo and done array of the item type
  done: Item[];
}
