package com.app.voting.repository;

import com.app.voting.model.Poll;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PollRepository extends JpaRepository<Poll, Long> {

    Page<Poll> findByQuestionContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );

    Page<Poll> findByCategoryIgnoreCase(
            String category,
            Pageable pageable
    );
}