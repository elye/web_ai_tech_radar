---
name: "DSPy"
ring: "assess"
quadrant: "tools"
tags: ["framework", "prompting", "optimization", "research"]
date: "2024-01-07"
featured: false
cost: "free"
---

# DSPy

## Overview
A framework from Stanford for programming (not prompting) language models, treating prompts as learnable parameters that can be optimized.

## Key Benefits
- Systematic prompt optimization
- Composable LM modules
- Automatic few-shot example selection
- Metric-driven optimization
- Reduces manual prompt engineering

## When to Use
- Complex LLM pipelines
- When you have evaluation metrics
- Research on LLM systems
- Optimizing multi-step reasoning
- Reducing prompt engineering overhead

## Considerations
- Still experimental
- Requires training data
- Learning curve for new paradigm
- Limited production use cases
- Rapidly evolving API

## Cost
**Free** - Open-source MIT license. DSPy library completely free. Costs from: LLM API calls during optimization (can be significant—optimizers may make hundreds of calls), evaluation dataset creation, compute for training. Compatible with any LLM provider or local models.

## Recommended Tools
- DSPy library
- Compatible with OpenAI, local models
- Integration with various LLM providers

## Resources
- [DSPy GitHub](https://github.com/stanfordnlp/dspy)
- [DSPy Documentation](https://dspy-docs.vercel.app/)
- [Intro to DSPy](https://github.com/stanfordnlp/dspy/blob/main/intro.ipynb)

## Status
**Ring: ASSESS** - Innovative approach, watch for maturity

## Last Updated
2024-01-07
