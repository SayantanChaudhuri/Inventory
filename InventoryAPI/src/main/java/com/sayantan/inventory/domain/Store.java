package com.sayantan.inventory.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "store")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String pname;
    private String model;
    private String description;
    private String partnumber;
    private String category;
    private String cost;
    private String instock;
    private String sold;
    private String notes;
}
