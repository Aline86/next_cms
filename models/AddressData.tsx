"use client";

export default class Address {
  id: number;
  title: string;
  type: string;
  address: string;
  town: string;
  constructor(
    title: string = "",
    address: string = "",
    town: string = "",
    id: number = -1,
    type: string = "address"
  ) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.town = town;
    this.type = type;
  }
}
