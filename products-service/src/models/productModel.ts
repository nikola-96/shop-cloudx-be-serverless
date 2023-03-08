import { v4 as UUID } from "uuid";
import { Product } from "../types";

export default class ProductModel {
  private _id: string;
  private _description: string;
  private _price: number;
  private _title: string;
  private _count: number;

  constructor({ id = UUID(), description, price, title, count = 0 }: Product) {
    this._id = id;
    this._description = description;
    this._price = price;
    this._title = title;
    this._count = count;
  }

  /**
   * Set Id
   * @param value
   */
  setId(value: string) {
    this._id = value !== "" ? value : null;
  }

  /**
   * Get Id
   * @return {string|*}
   */
  getId() {
    return this._id;
  }

  /**
   * Set Description
   * @param value
   */
  setDescription(value: string) {
    this._description = value !== "" ? value : null;
  }

  /**
   * Get Description
   * @return {string|*}
   */
  getDescription() {
    return this._description;
  }

  /**
   * Set Title
   * @param value
   */
  setTitle(value: string) {
    this._description = value !== "" ? value : null;
  }

  /**
   * Get Description
   * @return {string|*}
   */
  getTitle() {
    return this._title;
  }

  /**
   * Set Price
   * @param value
   */
  setPrice(value: number) {
    this._price = value >= 0 ? value : null;
  }

  /**
   * Get Price
   * @return {number|*}
   */
  getPrice() {
    return this._price;
  }

  /**
   * Set Count
   * @param value
   */

  setCount(value: number) {
    this._count = value >= 0 ? value : 0;
  }
  /**
   * Get Count
   * @return {number|*}
   */

  getCount() {
    return this._count;
  }
  /**
   * Get Base entity mappings
   * @return {IListInterface}
   */

  getEntityMappingsForProduct(): Product {
    return {
      id: this.getId(),
      description: this.getDescription(),
      price: this.getPrice(),
      title: this.getTitle(),
    };
  }

  getEntityMappingsForAvailableProduct(): Product {
    return {
      ...this.getEntityMappingsForProduct(),
      count: this.getCount(),
    };
  }
}
