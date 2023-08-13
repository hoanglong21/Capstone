package com.capstone.project.dto;

import com.capstone.project.model.ClassLearner;
import com.capstone.project.model.TestLearner;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestandClassLearnerDTO {

    private ClassLearner classLearner;

    private List<TestLearner> testLearner;

}
