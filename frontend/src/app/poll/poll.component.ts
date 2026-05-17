import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Poll, PollPage } from '../poll.models';
import { PollService } from '../poll.service';

interface ExtendedPoll extends Poll {
  selectedOptionIndex?: number | null;
}

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css',
})
export class PollComponent implements OnInit {
  loading = false;

  search = '';

  selectedCategory = '';

  currentPage = 0;

  totalPages = 0;

  pageSize = 6;

  categories = ['Technology', 'Education', 'Sports', 'Movies', 'Gaming', 'Others'];

  polls: ExtendedPoll[] = [];

  newPoll = {
    question: '',
    category: '',
    options: ['', ''],
  };

  constructor(
    private pollService: PollService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls() {
    this.loading = true;

    this.cdr.detectChanges();

    this.pollService
      .getPolls(this.currentPage, this.pageSize, this.search, this.selectedCategory)
      .subscribe({
        next: (response) => {
          const page: PollPage = response.data;

          this.polls = page.content.map((poll) => ({
            ...poll,
            selectedOptionIndex: null,
          }));

          /* FORCE RENDER */
          this.polls = [...this.polls];

          this.totalPages = page.totalPages;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: () => {
          this.loading = false;

          this.toastr.error('Failed to load polls');

          this.cdr.detectChanges();
        },
      });
  }

  createPoll() {
    if (!this.newPoll.question.trim() || !this.newPoll.category) {
      this.toastr.warning('Please fill all fields');

      return;
    }

    const filteredOptions = this.newPoll.options.filter((option) => option.trim() !== '');

    if (filteredOptions.length < 2) {
      this.toastr.warning('Add at least 2 options');

      return;
    }

    const payload = {
      question: this.newPoll.question.trim(),

      category: this.newPoll.category,

      options: filteredOptions,
    };

    this.pollService.createPoll(payload).subscribe({
      next: (response) => {
        this.toastr.success('Poll created successfully');

        const createdPoll: ExtendedPoll = {
          ...response.data,

          selectedOptionIndex: null,
        };

        /* INSTANT RENDER */
        this.polls = [createdPoll, ...this.polls];

        this.polls = [...this.polls];

        this.resetForm();

        this.currentPage = 0;

        this.cdr.detectChanges();
      },

      error: () => {
        this.toastr.error('Failed to create poll');

        this.cdr.detectChanges();
      },
    });
  }

  vote(pollId: number, optionIndex: number) {
    this.pollService.vote(pollId, optionIndex).subscribe({
      next: () => {
        const poll = this.polls.find((p) => p.id === pollId);

        if (poll) {
          /* UPDATE COUNT */
          poll.options[optionIndex].voteCount++;

          /* CLEAR SELECTION */
          poll.selectedOptionIndex = null;

          /* FORCE ARRAY REFERENCE CHANGE */
          this.polls = [...this.polls];
        }

        this.toastr.success('Vote submitted');

        this.cdr.detectChanges();
      },

      error: () => {
        this.toastr.error('Voting failed');

        this.cdr.detectChanges();
      },
    });
  }

  // OPTION SELECTION
  toggleSelectOption(poll: ExtendedPoll, index: number) {
    /* DOUBLE CLICK DESELECT */

    if (poll.selectedOptionIndex === index) {
      poll.selectedOptionIndex = null;
    } else {
      poll.selectedOptionIndex = index;
    }

    this.polls = [...this.polls];

    this.cdr.detectChanges();
  }

  deselectOption(poll: ExtendedPoll, index: number) {
    if (poll.selectedOptionIndex === index) {
      poll.selectedOptionIndex = null;

      this.polls = [...this.polls];

      this.cdr.detectChanges();
    }
  }

  resetForm() {
    this.newPoll = {
      question: '',

      category: '',

      options: ['', ''],
    };

    this.cdr.detectChanges();
  }

  addOption() {
    this.newPoll.options.push('');

    this.newPoll.options = [...this.newPoll.options];

    this.cdr.detectChanges();
  }

  removeOption(index: number) {
    this.newPoll.options.splice(index, 1);

    this.newPoll.options = [...this.newPoll.options];

    this.cdr.detectChanges();
  }

  dropOption(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.newPoll.options, event.previousIndex, event.currentIndex);

    this.newPoll.options = [...this.newPoll.options];

    this.cdr.detectChanges();
  }

  //   PAGINATION
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;

      this.loadPolls();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;

      this.loadPolls();
    }
  }

  // STATS
  getTotalVotes(poll: Poll): number {
    return poll.options.reduce(
      (sum, option) => sum + option.voteCount,

      0,
    );
  }

  getPercentage(votes: number, poll: Poll): number {
    const total = this.getTotalVotes(poll);

    if (total === 0) {
      return 0;
    }

    return (votes / total) * 100;
  }

  trackByIndex(index: number): number {
    return index;
  }
}