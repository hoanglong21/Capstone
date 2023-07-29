package com.capstone.project.dto;

import com.capstone.project.model.Card;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardWrapper {
    private Card card;
    private Object content;
    private Object progress;
}
