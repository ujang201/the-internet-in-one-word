# The Internet in One Word

[![make.fun](https://make.fun/badge/u-ronigrv-the-internet-in-one-word-e388f33b.svg)](https://make.fun/bounty/u-ronigrv-the-internet-in-one-word-e388f33b)
[![rank](https://make.fun/badge/u-ronigrv-the-internet-in-one-word-e388f33b/ujang201/the-internet-in-one-word/rank.svg)](https://make.fun/bounty/u-ronigrv-the-internet-in-one-word-e388f33b)
[![reward](https://make.fun/badge/u-ronigrv-the-internet-in-one-word-e388f33b/ujang201/the-internet-in-one-word/reward.svg)](https://make.fun/bounty/u-ronigrv-the-internet-in-one-word-e388f33b)

One word for the whole internet: **yapping**.

The entire internet is millions of people talking at once about everything
and nothing — funny on its own, true of the whole internet rather than one
app, and not the first word anyone reaches for. The program scores a fixed
table of candidates against five weighted criteria, so the winning word is
chosen by reasoning, not by chance. `main.ts` picks the word
deterministically from a fixed candidate table scored against the judge's
five criteria (single word, funny, true of the whole internet, surprising,
lands in one beat), checks the entry gate (1–30 characters, one word, not
only white space), and writes it to `entry.txt`.

## Run

```sh
node main.ts
```

Verify the word: `node main.ts && cat /output/entry.txt`   # prints the single winning word

Writes the word to `$OUTPUT_DIR/entry.txt` (default `/output/entry.txt`).
No randomness, no clock, no network, no input — every run writes the same
bytes.

https://make.fun/r/wfjv7kgb
