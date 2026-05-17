package com.app.voting.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VoteRequestDTO {

    @NotNull(message = "Poll ID is required")
    private Long pollId;

    @NotNull(message = "Option index is required")
    private Integer optionIndex;
}