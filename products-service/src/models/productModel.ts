import { v4 as UUID } from "uuid";
import { Product } from "../types";

export default class ProductModel {
  private _id: string;
  private _description: string;
  private _price: number;
  private _title: string;

  constructor({ id = UUID(), description, price, title }: Product) {
    this._id = id;
    this._description = description;
    this._price = price;
    this._title = title;
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
   * @return {string|*}
   */
  getPrice() {
    return this._price;
  }

  /**
   * Get Base entity mappings
   * @return {IListInterface}
   */

  getEntityMappings(): Product {
    return {
      id: this.getId(),
      description: this.getDescription(),
      price: this.getPrice(),
      title: this.getTitle(),
    };
  }
}
