# Data Model: Azure Agentic Case Study

**Date**: 2026-08-14

This document has two parts:
1. The MDX works entry frontmatter schema (how the case study is stored in the portfolio)
2. The AdventureWorksLT entity reference (the database the project queried)

---

## Part 1: Works Entry (Portfolio Content Schema)

**Source**: `src/content/works/azure-agentic-case-study.mdx` frontmatter
**Schema**: `src/content.config.ts` → `works` collection (unchanged)

| Field | Value | Notes |
|-------|-------|-------|
| `title` | `'Modernizing and Deploying an Agentic Data Application on Azure'` | Exact project title |
| `description` | `'Modernized and deployed Microsoft's agentic enterprise-data accelerator using FastAPI, Terraform, Managed Identity, Azure Container Apps, and Azure SQL.'` | Short description for Works index card |
| `tech` | See technology tags below | Array of 12 strings |
| `order` | `1` | First and featured work |
| `publishDate` | `2026-08-14` | Portfolio completion date |
| `link` | omitted | No canonical project URL |
| `repo` | omitted | Microsoft's accelerator repo — not Joel's personal repo |
| `thumbnail` | omitted initially | Add when screenshot asset available |

**Technology tags** (12, in display order):
```
Python · FastAPI · Terraform · Azure Container Apps · Azure Container Registry ·
Managed Identity · Azure RBAC · Azure SQL · Cosmos DB · Microsoft Foundry · React · Log Analytics
```

---

## Part 2: AdventureWorksLT Database Entities

**Purpose**: Reference for the interactive ER-style data model visualization on the case study page.
**Source**: Microsoft-published AdventureWorksLT schema (authoritative). Only entities relevant
to the project's natural-language data queries are shown.

### Entity: SalesLT.Customer

| Column | Type | Constraint | Notes |
|--------|------|-----------|-------|
| CustomerID | int | PK, identity | Surrogate key |
| FirstName | nvarchar(50) | NOT NULL | |
| LastName | nvarchar(50) | NOT NULL | |
| EmailAddress | nvarchar(50) | NULL | |
| Phone | nvarchar(25) | NULL | |
| ModifiedDate | datetime | NOT NULL | |

### Entity: SalesLT.SalesOrderHeader

| Column | Type | Constraint | Notes |
|--------|------|-----------|-------|
| SalesOrderID | int | PK, identity | Surrogate key |
| CustomerID | int | FK → Customer | |
| OrderDate | datetime | NOT NULL | |
| DueDate | datetime | NOT NULL | |
| ShipDate | datetime | NULL | |
| SubTotal | money | NOT NULL | |
| TaxAmt | money | NOT NULL | |
| Freight | money | NOT NULL | |
| TotalDue | money | computed | SubTotal + TaxAmt + Freight |
| Status | tinyint | NOT NULL | 1=In process, 5=Shipped, etc. |

### Entity: SalesLT.SalesOrderDetail

| Column | Type | Constraint | Notes |
|--------|------|-----------|-------|
| SalesOrderDetailID | int | PK, identity | Surrogate key |
| SalesOrderID | int | FK → SalesOrderHeader | |
| ProductID | int | FK → Product | |
| OrderQty | smallint | NOT NULL | |
| UnitPrice | money | NOT NULL | |
| UnitPriceDiscount | money | NOT NULL DEFAULT 0.0 | |
| LineTotal | money | computed | OrderQty × UnitPrice × (1 - Discount) |

### Entity: SalesLT.Product

| Column | Type | Constraint | Notes |
|--------|------|-----------|-------|
| ProductID | int | PK, identity | Surrogate key |
| Name | nvarchar(50) | NOT NULL | |
| ProductNumber | nvarchar(25) | NOT NULL | |
| ProductModelID | int | FK → ProductModel | nullable |
| ProductCategoryID | int | FK → ProductCategory | nullable |
| ListPrice | money | NOT NULL | |
| StandardCost | money | NOT NULL | |
| SellStartDate | datetime | NOT NULL | |
| SellEndDate | datetime | NULL | |

### Entity: SalesLT.ProductCategory

| Column | Type | Constraint | Notes |
|--------|------|-----------|-------|
| ProductCategoryID | int | PK, identity | |
| ParentProductCategoryID | int | FK → ProductCategory (self) | NULL = top-level |
| Name | nvarchar(50) | NOT NULL | |

### Entity: SalesLT.ProductModel

| Column | Type | Constraint | Notes |
|--------|------|-----------|-------|
| ProductModelID | int | PK, identity | |
| Name | nvarchar(50) | NOT NULL | |

### Entity: SalesLT.Address

| Column | Type | Constraint | Notes |
|--------|------|-----------|-------|
| AddressID | int | PK, identity | |
| AddressLine1 | nvarchar(60) | NOT NULL | |
| AddressLine2 | nvarchar(60) | NULL | |
| City | nvarchar(30) | NOT NULL | |
| StateProvince | nvarchar(50) | NOT NULL | |
| CountryRegion | nvarchar(50) | NOT NULL | |
| PostalCode | nvarchar(15) | NOT NULL | |

### Entity: SalesLT.CustomerAddress

| Column | Type | Constraint | Notes |
|--------|------|-----------|-------|
| CustomerID | int | PK + FK → Customer | Composite PK |
| AddressID | int | PK + FK → Address | Composite PK |
| AddressType | nvarchar(50) | NOT NULL | e.g., 'Main Office', 'Shipping' |

---

## Relationships Summary (for diagram)

```
Customer ──────────────────────────── 1:N ──→ SalesOrderHeader
SalesOrderHeader ─────────────────── 1:N ──→ SalesOrderDetail
SalesOrderDetail ─────────────────── N:1 ──→ Product
Product ──────────────────────────── N:1 ──→ ProductCategory
Product ──────────────────────────── N:1 ──→ ProductModel
ProductCategory ──────────────────── self ─→ ProductCategory (parent)
Customer ──────────────────────────── 1:N ──→ CustomerAddress
CustomerAddress ──────────────────── N:1 ──→ Address
```

---

## Architecture Diagram Nodes (responsibility reference)

Used by the interactive architecture diagram to populate hover/click tooltips.

| Node | Layer | Owner | Detail text |
|------|-------|-------|-------------|
| User | Client | — | End user sending natural-language queries |
| React/nginx frontend | Application | Joel (deployed) | React SPA, containerized with nginx, deployed to Azure Container Apps |
| Python FastAPI backend | Application | Joel (modernized) | FastAPI backend; chat orchestration entry point; persists conversations to Cosmos DB |
| Chat Orchestrator | AI | Microsoft (provided) | Routes user messages to the correct agent via Microsoft Foundry |
| Microsoft Foundry | AI | Microsoft (provided) | AI project runtime hosting agents and tools |
| FoundryAgent (first-agent) | AI | Microsoft (provided) | The named agent that processes queries and invokes tools |
| SQL Query Tool | AI | Microsoft (provided) | Tool registered in FoundryAgent; generates and executes SQL against Azure SQL |
| Azure SQL (AdventureWorksLT) | Data | Joel (configured) | Azure SQL database with AdventureWorksLT sample data; Entra auth + db_datareader/db_datawriter roles configured by Joel |
| Azure Cosmos DB | Data | Joel (configured) | NoSQL store for conversation history; networking and data-plane permissions configured by Joel |
| Azure Container Apps Env | Infrastructure | Joel (Terraform) | Consumption-tier Container Apps environment; replaced original App Service plan |
| Azure Container Registry | Infrastructure | Joel (Terraform) | ACR for frontend and backend container images |
| Managed Identity (user-assigned) | Infrastructure | Joel (Terraform) | Used by Container Apps for credential-less access to Cosmos DB, ACR, and other services |
| Azure RBAC | Infrastructure | Joel (configured) | Role assignments for Managed Identity and Entra authorization |
| Log Analytics | Infrastructure | Joel (Terraform) | Workspace for Container Apps diagnostic logs |
| Terraform | IaC | Joel | Brownfield Terraform configuration managing all Azure infrastructure |
| Microsoft Fabric | Alternative path | Microsoft (provided) | Alternative accelerator data path; not active in final deployment (USE_DATA_AGENT=false) |
