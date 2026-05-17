package com.app.voting.service;

import com.app.voting.dto.PollRequestDTO;
import com.app.voting.model.OptionVote;
import com.app.voting.model.Poll;
import com.app.voting.repository.PollRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PollService {

    private final PollRepository pollRepository;

    public Poll createPoll(PollRequestDTO dto) {

        Poll poll = new Poll();

        poll.setQuestion(dto.getQuestion());
        poll.setCategory(dto.getCategory());

        List<OptionVote> optionVotes =
                dto.getOptions()
                        .stream()
                        .map(option -> {
                            OptionVote ov = new OptionVote();
                            ov.setOptionText(option);
                            return ov;
                        })
                        .toList();

        poll.setOptions(optionVotes);

        return pollRepository.save(poll);
    }

    public Page<Poll> getAllPolls(
            int page,
            int size,
            String search,
            String category
    ) {

        Pageable pageable =
                PageRequest.of(page, size,
                        Sort.by("createdAt").descending());

        if(search != null && !search.isBlank()) {
            return pollRepository
                    .findByQuestionContainingIgnoreCase(
                            search,
                            pageable
                    );
        }

        if(category != null && !category.isBlank()) {
            return pollRepository
                    .findByCategoryIgnoreCase(
                            category,
                            pageable
                    );
        }

        return pollRepository.findAll(pageable);
    }

    public Poll getPollById(Long id) {

        return pollRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Poll not found"));
    }

    @Transactional
    public void vote(Long pollId, int optionIndex) {

        Poll poll = getPollById(pollId);

        if(optionIndex < 0 ||
                optionIndex >= poll.getOptions().size()) {

            throw new RuntimeException("Invalid option");
        }

        OptionVote option =
                poll.getOptions().get(optionIndex);

        option.setVoteCount(
                option.getVoteCount() + 1
        );

        pollRepository.save(poll);
    }
}