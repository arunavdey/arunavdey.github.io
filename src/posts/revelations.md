---
title: Revelations
date: 2026-07-25
---

(12:27 AM) I felt like solving a LeetCode problem tonight, and decided to start with a classic; [Two Sum](https://leetcode.com/problems/two-sum/description/).

This problem is interesting. The goal is to, at worst, end up in linear time complexity, `O(n)`.

There's a very natural solution to this. I iterate through each value in the array, and also check if its complement (i.e. `target - num`) exists in the array. The problem with this is that searching for the existence of an element in an array is an `O(n)` operation. So we're working with `O(n^2)` here, because for every element, we're checking for its complement using an `O(n)` operation.

This "checking" can be made *much* more efficient. A sensible way to convert an `O(n^2)` solution to an `O(n)` solution, is by making the "checking" `O(1)`. 

We iterate through the elements, again. This time, however, for every new element we see, we remember its existence in a data structure. At every iteration, we check if this "memory" data structure has the complement that we're looking for. If it does, well and good, if not, we move on.

The most sensible data structure for the "memory" would be something that has `O(1)` inserts, and `O(1)` reads: hash-tables! This is perfect for this problem. At every iteration, at worst, there would be an `O(1)` operation to read + an `O(1)` operation to write. We have now achieved very efficient memory checks, and brought our final solution down to `O(n)`!

Each entry in the hash-table would be keyed using that index's number's complement, with its value being the index of the number itself, i.e., `{target - nums[i]: i}`. We do this so that on every iteration, we can check if `nums[i]` exists in `hashtable`. If it does, `[i, map[nums[i]]]` is our answer.

```python
def solve(nums: List[int], target: int):
    hmap = dict()
    for i in range(len(nums)):
        if nums[i] in hmap:
            return [i, hmap[nums[i]]]
        hmap[target - nums[i]] = i
    return []
```

(sorry, I'm a python normie)
