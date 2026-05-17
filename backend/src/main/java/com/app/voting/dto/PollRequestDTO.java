package com.app.voting.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class PollRequestDTO {

    @NotBlank(message = "Question is required")
    private String question;

    @NotBlank(message = "Category is required")
    private String category;

    @NotEmpty(message = "Options cannot be empty")
    private List<String> options;
}