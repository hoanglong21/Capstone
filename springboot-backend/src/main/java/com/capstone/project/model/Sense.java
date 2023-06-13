package com.capstone.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Sense {
    private List<String> type; //pos
    private List<String> relate; //xref
    private List<String> definition; //gloss
    private List<Example> example;
}
