/**
 * Sample Data for AI Technology Radar
 * This file contains embedded markdown content for the initial load
 */

const SAMPLE_DATA = [
    {
        name: "rag.md",
        content: `---
name: "Retrieval-Augmented Generation (RAG)"
ring: "adopt"
quadrant: "techniques"
tags: ["llm", "retrieval", "generation", "nlp"]
date: "2024-01-15"
featured: true
---

# Retrieval-Augmented Generation (RAG)

## Overview
RAG combines retrieval-based and generative AI models to produce more accurate and contextually relevant responses by grounding LLM outputs in external knowledge sources.

## Key Benefits
- Reduces hallucinations in LLM outputs
- Enables LLMs to access up-to-date information
- More cost-effective than fine-tuning for domain-specific knowledge
- Provides source attribution and traceability

## When to Use
- Building Q&A systems with enterprise documentation
- Creating chatbots that need current information
- Applications requiring verifiable sources
- Domain-specific AI assistants

## Considerations
- Requires well-organized vector databases
- Query quality affects retrieval accuracy
- Latency considerations with retrieval step
- Cost of embedding generation and vector storage

## Recommended Tools
- LangChain, LlamaIndex
- Vector DBs: Pinecone, Weaviate, Chroma
- Embedding models: OpenAI, Cohere, Sentence Transformers

## Resources
- [LangChain RAG Documentation](https://python.langchain.com/docs/use_cases/question_answering/)
- [RAG Research Paper](https://arxiv.org/abs/2005.11401)

## Status
**Ring: ADOPT** - Production-ready, widely proven, recommended for use`
    },
    {
        name: "prompt-engineering.md",
        content: `---
name: "Prompt Engineering"
ring: "adopt"
quadrant: "techniques"
tags: ["llm", "prompting", "optimization"]
date: "2024-01-10"
featured: true
---

# Prompt Engineering

## Overview
The practice of designing and optimizing input prompts to elicit desired outputs from Large Language Models.

## Key Benefits
- Improves accuracy and relevance of LLM outputs
- Cost-effective compared to fine-tuning
- Immediate results without model training
- Enables complex reasoning and task decomposition

## When to Use
- Any LLM-based application
- Task-specific optimization
- Chain-of-thought reasoning requirements

## Status
**Ring: ADOPT** - Essential skill for LLM applications`
    },
    {
        name: "fine-tuning-llms.md",
        content: `---
name: "Fine-tuning LLMs"
ring: "trial"
quadrant: "techniques"
tags: ["llm", "training", "customization"]
date: "2024-01-12"
featured: false
---

# Fine-tuning LLMs

## Overview
Adapting pre-trained language models to specific tasks or domains by training on custom datasets.

## Key Benefits
- Domain-specific expertise
- Consistent output formatting
- Reduced prompt engineering needs

## When to Use
- Large datasets available (1000+ examples)
- Consistent formatting requirements
- Domain-specific jargon and knowledge

## Status
**Ring: TRIAL** - Effective for specific use cases`
    },
    {
        name: "multi-modal-ai.md",
        content: `---
name: "Multi-modal AI"
ring: "trial"
quadrant: "techniques"
tags: ["vision", "audio", "multimodal"]
date: "2024-01-08"
featured: true
---

# Multi-modal AI

## Overview
AI systems that can process and generate multiple types of data (text, images, audio, video) simultaneously.

## Key Benefits
- More natural human-computer interaction
- Comprehensive data analysis across modalities
- Enhanced accessibility features

## Status
**Ring: TRIAL** - Rapidly maturing, excellent for specific use cases`
    },
    {
        name: "agentic-workflows.md",
        content: `---
name: "Agentic Workflows"
ring: "assess"
quadrant: "techniques"
tags: ["agents", "autonomous", "reasoning"]
date: "2024-01-05"
featured: false
---

# Agentic Workflows

## Overview
AI systems that can autonomously plan, execute, and iterate on tasks using multiple tools.

## Key Benefits
- Autonomous task completion
- Complex problem-solving capabilities
- Tool integration and orchestration

## Status
**Ring: ASSESS** - Promising but still maturing`
    },
    {
        name: "constitutional-ai.md",
        content: `---
name: "Constitutional AI"
ring: "assess"
quadrant: "techniques"
tags: ["safety", "alignment", "ethics"]
date: "2024-01-03"
featured: false
---

# Constitutional AI

## Overview
A method for training AI systems to be harmless and helpful by having them critique and revise their own outputs.

## Key Benefits
- Improved safety and alignment
- Reduced harmful outputs
- Self-correction capabilities

## Status
**Ring: ASSESS** - Important for safety, but still emerging`
    },
    {
        name: "chatgpt-gpt4.md",
        content: `---
name: "ChatGPT / GPT-4"
ring: "adopt"
quadrant: "models"
tags: ["openai", "llm", "chatbot"]
date: "2024-01-15"
featured: true
---

# ChatGPT / GPT-4

## Overview
OpenAI's flagship conversational AI with advanced natural language understanding.

## Key Benefits
- State-of-the-art language understanding
- Multi-modal capabilities (GPT-4V)
- Large context window (128k tokens)
- Extensive API ecosystem

## Status
**Ring: ADOPT** - Industry-leading, production-ready`
    },
    {
        name: "claude.md",
        content: `---
name: "Claude"
ring: "adopt"
quadrant: "models"
tags: ["anthropic", "llm", "chatbot"]
date: "2024-01-15"
featured: true
---

# Claude

## Overview
Anthropic's AI assistant focused on being helpful, harmless, and honest.

## Key Benefits
- 200k token context window
- Strong analytical capabilities
- Constitutional AI for safety
- Excellent at long-form content

## Status
**Ring: ADOPT** - Excellent alternative to GPT-4`
    },
    {
        name: "github-copilot.md",
        content: `---
name: "GitHub Copilot"
ring: "adopt"
quadrant: "tools"
tags: ["coding", "ide", "productivity"]
date: "2024-01-13"
featured: true
---

# GitHub Copilot

## Overview
AI-powered code completion tool integrated directly into your development environment.

## Key Benefits
- Real-time code suggestions
- IDE integration
- Multi-language support
- Context-aware completions

## Status
**Ring: ADOPT** - Essential tool for modern developers`
    },
    {
        name: "langchain.md",
        content: `---
name: "LangChain"
ring: "trial"
quadrant: "tools"
tags: ["framework", "llm", "orchestration"]
date: "2024-01-10"
featured: false
---

# LangChain

## Overview
A framework for developing applications powered by language models.

## Key Benefits
- Simplifies LLM application development
- Extensive integrations
- Built-in components for common patterns

## Status
**Ring: TRIAL** - Useful but evolving rapidly`
    },
    {
        name: "llamaindex.md",
        content: `---
name: "LlamaIndex"
ring: "trial"
quadrant: "tools"
tags: ["framework", "rag", "data"]
date: "2024-01-09"
featured: false
---

# LlamaIndex

## Overview
A data framework for LLM applications, specializing in RAG.

## Key Benefits
- Purpose-built for RAG applications
- Excellent data connector ecosystem
- Flexible indexing strategies

## Status
**Ring: TRIAL** - Excellent for RAG, more stable than LangChain`
    },
    {
        name: "cursor-ai.md",
        content: `---
name: "Cursor AI"
ring: "trial"
quadrant: "tools"
tags: ["ide", "coding", "ai-native"]
date: "2024-01-07"
featured: false
---

# Cursor AI

## Overview
An AI-first code editor built on VS Code.

## Key Benefits
- AI-native design
- Intelligent code completion
- Codebase-wide understanding

## Status
**Ring: TRIAL** - Innovative approach, worth evaluating`
    },
    {
        name: "huggingface.md",
        content: `---
name: "Hugging Face"
ring: "adopt"
quadrant: "tools"
tags: ["models", "transformers", "community"]
date: "2024-01-11"
featured: false
---

# Hugging Face

## Overview
The GitHub of machine learning - a platform for sharing AI models and datasets.

## Key Benefits
- Massive model repository
- Easy model fine-tuning
- Active community
- Inference API

## Status
**Ring: ADOPT** - Essential resource for ML practitioners`
    },
    {
        name: "openai-api.md",
        content: `---
name: "OpenAI API"
ring: "adopt"
quadrant: "platforms"
tags: ["api", "cloud", "llm"]
date: "2024-01-15"
featured: true
---

# OpenAI API

## Overview
OpenAI's cloud API providing access to GPT-4, DALL-E, Whisper, and other models.

## Key Benefits
- Industry-leading models
- Simple, well-documented API
- High reliability and uptime
- Function calling capabilities

## Status
**Ring: ADOPT** - Gold standard for LLM APIs`
    },
    {
        name: "azure-openai.md",
        content: `---
name: "Azure OpenAI"
ring: "adopt"
quadrant: "platforms"
tags: ["azure", "microsoft", "enterprise"]
date: "2024-01-14"
featured: false
---

# Azure OpenAI

## Overview
Microsoft Azure's implementation of OpenAI models with enterprise features.

## Key Benefits
- Enterprise SLAs and support
- Data residency and compliance
- Private networking options
- Azure ecosystem integration

## Status
**Ring: ADOPT** - Best choice for enterprise OpenAI deployments`
    },
    {
        name: "aws-bedrock.md",
        content: `---
name: "AWS Bedrock"
ring: "trial"
quadrant: "platforms"
tags: ["aws", "cloud", "serverless"]
date: "2024-01-12"
featured: true
---

# AWS Bedrock

## Overview
Fully managed service providing access to foundation models from multiple providers.

## Key Benefits
- Multiple model providers
- Enterprise security
- No infrastructure management
- AWS ecosystem integration

## Status
**Ring: TRIAL** - Mature enough for production`
    },
    {
        name: "vertex-ai.md",
        content: `---
name: "Google Vertex AI"
ring: "trial"
quadrant: "platforms"
tags: ["google", "cloud", "gemini"]
date: "2024-01-11"
featured: false
---

# Google Vertex AI

## Overview
Google Cloud's unified AI platform with access to Gemini models.

## Key Benefits
- Access to Gemini Pro and Ultra
- Integrated ML platform
- Strong multi-modal capabilities

## Status
**Ring: TRIAL** - Strong capabilities, especially with Gemini`
    },
    {
        name: "anthropic-api.md",
        content: `---
name: "Anthropic API"
ring: "adopt"
quadrant: "platforms"
tags: ["api", "claude", "llm"]
date: "2024-01-13"
featured: false
---

# Anthropic API

## Overview
Direct API access to Claude models from Anthropic.

## Key Benefits
- 200k token context window
- Strong reasoning capabilities
- Constitutional AI for safety
- Competitive pricing

## Status
**Ring: ADOPT** - Excellent OpenAI alternative`
    },
    {
        name: "replicate.md",
        content: `---
name: "Replicate"
ring: "trial"
quadrant: "platforms"
tags: ["api", "models", "hosting"]
date: "2024-01-08"
featured: false
---

# Replicate

## Overview
Cloud platform for running open-source machine learning models via API.

## Key Benefits
- Run open-source models via API
- No infrastructure management
- Wide model selection

## Status
**Ring: TRIAL** - Great for experimentation`
    },
    {
        name: "python-ml.md",
        content: `---
name: "Python for ML"
ring: "adopt"
quadrant: "tools"
tags: ["python", "ml", "data-science"]
date: "2024-01-15"
featured: true
---

# Python for ML

## Overview
Python is the de facto standard for machine learning and AI development.

## Key Benefits
- Massive ML/AI library ecosystem
- Easy to learn and read
- Strong community support
- Integration with all major ML frameworks

## Status
**Ring: ADOPT** - Essential for AI/ML development`
    },
    {
        name: "pytorch.md",
        content: `---
name: "PyTorch"
ring: "adopt"
quadrant: "tools"
tags: ["deep-learning", "framework", "research"]
date: "2024-01-14"
featured: true
---

# PyTorch

## Overview
Meta's deep learning framework, dominant in AI research.

## Key Benefits
- Intuitive, pythonic API
- Dynamic computation graphs
- Excellent for research
- Strong community

## Status
**Ring: ADOPT** - Leading framework for deep learning`
    },
    {
        name: "tensorflow.md",
        content: `---
name: "TensorFlow"
ring: "trial"
quadrant: "tools"
tags: ["deep-learning", "google", "production"]
date: "2024-01-12"
featured: false
---

# TensorFlow

## Overview
Google's comprehensive machine learning platform.

## Key Benefits
- Production-ready ecosystem
- TensorFlow Lite for mobile/edge
- Strong deployment tools

## Status
**Ring: TRIAL** - Still valuable for production`
    },
    {
        name: "rust-ai.md",
        content: `---
name: "Rust for AI"
ring: "assess"
quadrant: "tools"
tags: ["rust", "performance", "safety"]
date: "2024-01-10"
featured: false
---

# Rust for AI

## Overview
Rust is emerging for AI infrastructure and performance-critical ML components.

## Key Benefits
- Memory safety without GC
- Excellent performance
- Safe concurrency

## Status
**Ring: ASSESS** - Promising for infrastructure`
    },
    {
        name: "jax.md",
        content: `---
name: "JAX"
ring: "trial"
quadrant: "tools"
tags: ["google", "research", "performance"]
date: "2024-01-09"
featured: false
---

# JAX

## Overview
Google's library for high-performance numerical computing and ML research.

## Key Benefits
- NumPy-like API
- Automatic differentiation
- JIT compilation for performance

## Status
**Ring: TRIAL** - Excellent for research`
    },
    {
        name: "dspy.md",
        content: `---
name: "DSPy"
ring: "assess"
quadrant: "tools"
tags: ["framework", "prompting", "stanford"]
date: "2024-01-07"
featured: false
---

# DSPy

## Overview
Stanford framework for programming (not prompting) language models.

## Key Benefits
- Systematic prompt optimization
- Composable LM modules
- Metric-driven optimization

## Status
**Ring: ASSESS** - Innovative approach, watch for maturity`
    },
    {
        name: "semantic-kernel.md",
        content: `---
name: "Semantic Kernel"
ring: "trial"
quadrant: "tools"
tags: ["microsoft", "orchestration", "dotnet"]
date: "2024-01-06"
featured: false
---

# Semantic Kernel

## Overview
Microsoft's SDK for integrating AI services into applications.

## Key Benefits
- Multi-language support
- Plugin architecture
- Enterprise-friendly
- Azure integration

## Status
**Ring: TRIAL** - Good for Microsoft-centric environments`
    }
];
