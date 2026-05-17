package com.app.voting.controller;

import com.app.voting.dto.PollRequestDTO;
import com.app.voting.dto.VoteRequestDTO;
import com.app.voting.model.Poll;
import com.app.voting.payload.ApiResponse;
import com.app.voting.service.PollService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/polls")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PollController {

    private final PollService pollService;

    @PostMapping
    public ApiResponse<Poll> createPoll(
            @Valid @RequestBody PollRequestDTO dto
    ) {

        return new ApiResponse<>(
                true,
                "Poll created successfully",
                pollService.createPoll(dto)
        );
    }

    @GetMapping
    public ApiResponse<Page<Poll>> getPolls(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "6")
            int size,

            @RequestParam(required = false)
            String search,

            @RequestParam(required = false)
            String category
    ) {

        return new ApiResponse<>(
                true,
                "Polls fetched successfully",
                pollService.getAllPolls(
                        page,
                        size,
                        search,
                        category
                )
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<Poll> getPollById(
            @PathVariable Long id
    ) {

        return new ApiResponse<>(
                true,
                "Poll fetched successfully",
                pollService.getPollById(id)
        );
    }

    @PostMapping("/vote")
    public ApiResponse<String> vote(
            @Valid @RequestBody VoteRequestDTO dto
    ) {

        pollService.vote(
                dto.getPollId(),
                dto.getOptionIndex()
        );

        return new ApiResponse<>(
                true,
                "Vote submitted successfully",
                null
        );
    }
}