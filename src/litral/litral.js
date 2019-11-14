import dskf from '../UIComponent/Button/Button.module.css' 
import {primary} from '../components/LogOut/LogOut.module.css'
import React from 'react';
 const litral={

    inputLoginText:[
        {
            variant:'primary',
            size:'lg',
            tabindex:3,
            buttonText:'Next',
            type:'submit',
            classcss:'nextButtonCss'
         }
     ],
    inputText:[
        {
           placeholder:'User name',
           type:'text',
           tabindex:1,
           autoFocus:true,
        },
        {
           placeholder:'Password',
           tabindex:2,
           type:'password'
        }
     ],
     nextAndBackButton:[
      {
         variant:'primary',
         size:'lg',
         buttonText:'Back',
         type:'button',
         tabindex:7,
         className:dskf.colourRed
      },
      {
         variant:'primary',
         size:'lg',
         buttonText:'Next',
         type:'submit',
         tabindex:6,
         classcss:'nextButtonCss'
      }
   ],
     loginButton:[
        {
           variant:'primary',
           size:'lg',
           buttonText:'Exit',
           type:'button',
           tabindex:4,
           className:dskf.colourRed
        },
        {
           variant:'primary',
           size:'lg',
           tabindex:3,
           buttonText:'Next',
           type:'submit',
           classcss:'nextButtonCss'
        }
     ],
     HomeButton:[
        {
           variant:'primary',
           size:'lg',
           tabindex:3,
           buttonText:'Home',
           type:'submit',
           classcss:'nextButtonCss'
        }
     ],
     buttonType2:[
        {
           variant:'primary',
           size:'lg',
           buttonText:'Back',
           type:'button',
        },
        {
           variant:'primary',
           size:'lg',
           buttonText:'Next',
           type:'button',
        },
        {
           variant:'primary',
           buttonText:'Save',
           size:'lg',
           type:'button',
           disabled:false
        }
     ],
     buttonType3:[
        {
           variant:'primary',
           size:'lg',
           buttonText:'Back',
           type:'button',
        },
        {
           variant:'primary',
           size:'lg',
           buttonText:'Submit',
           type:'submit',
        },
        {
           variant:'primary',
           buttonText:'Save',
           size:'lg',
           type:'button',
           disabled:false
        }],
     
     textForLogin:'Please access the Engagement Complexity Tool using your AD-ONE User Name and Password',
     table:{
        theader:[
           'OCOD opportunity name',
           'Nickname',
           'Account',
           'Next assessment gate',
           ' '
        ],
        tbody:[
           {
              OpportunityName:'Finance Transformation - Larger Programme (Won & booked separately for £1.75m)',
              NickName:'Mondeo',
              Account:'Tesco Plc',
              NextGate:'BCR0C',
              Update:'update'
           },
           {
              OpportunityName:'Finance Transformation - Larger Programme (Won & booked separately for £1.75m)',
              NickName:'Mondeo',
              Account:'Tesco Plc',
              NextGate:'BCR0C',
              Update:'update'
           },
           {
              OpportunityName:'Finance Transformation - Larger Programme (Won & booked separately for £1.75m)',
              NickName:'Mondeo',
              Account:'Tesco Plc',
              NextGate:'BCR0C',
              Update:'update'
           },
           {
              OpportunityName:'Finance Transformation - Larger Programme (Won & booked separately for £1.75m)',
              NickName:'Mondeo',
              Account:'Tesco Plc',
              NextGate:'BCR0C',
              Update:'update'
           }
        ]
     },
     tableForSerch:{
      theader:[
         'Opportunity name',
         'Account',
         'Sector',
         'Nickname',
         ' '
      ],
      tbody:[
         {
            OpportunityName:'Finance Transformation - Larger Programme (Won & booked separately for £1.75m)',
            Account:'Tesco Plc',
            Sector:'COM3-Retail',
            NickName:'Mondeo',
            Update:'update'
         },
         {
            OpportunityName:'Finance Transformation - Larger Programme (Won & booked separately for £1.75m)',
            Account:'Tesco Plc',
            Sector:'COM3-Retail',
            NickName:'Mondeo',
            Update:'update'
         },
         {
            OpportunityName:'Finance Transformation - Larger Programme (Won & booked separately for £1.75m)',
            Account:'Tesco Plc',
            Sector:'COM3-Retail',
            NickName:'Mondeo',
            Update:'update'
         },
         {
            OpportunityName:'Finance Transformation - Larger Programme (Won & booked separately for £1.75m)',
            Account:'Tesco Plc',
            Sector:'COM3-Retail',
            NickName:'Mondeo',
            Update:'update'
         }
      ]
   },
     opportunitySertchTable:{theader :["Opportunity name","Account","Primary horizontal","Owner","Sales stage",""],tbody:[]},
     assessmenttableText:'My recent complexity assessments',
     assessmentTableHelper:'You can click upon one of your recent complexity assessments to update it.',
     createText:'Create complexity assessment',
     updateText:'Update complexity assessment',
     tryText:'Try the complexity assessment tool',
     report:'Extract reports',
     TextForAssessement:'You can use the trial feature to see how complexity assessments are entered and completed, and look at the outputs that are produced',

dataCheck:[
   {
       "id": 1,
       "name": "Client Factors",
       "subFactorDetails": [
           {

               "name": "Client Relationship",

               "description": "Project complexity and overall risk profile shall be influenced in respect of: projects which are commissioned and executed for clients where the client relationship is new or forming; or an existing client relationship is deteriorating; or the client behaviour / culture is not conducive to effective partnership working. Conversely, there is the least amount of project complexity where there is already an effective and positive client engagement at the \"working\" (project/programme/portfolio) level and Sopra Steria have a viable engagement at all relevant senior levels within the client organisation.",

               "id": 1,

               "impactDetails": {

                   "name": "Medium",

                   "id": 2,

                   "score": 2

               },

               "complexityScore": [

                   {

                       "name": "veryHigh",

                       "id": 4,

                       "score": 4,

                       "description": "There is an effective and positive client engagement at the \"working\" (project/programme/portfolio) level and Sopra Steria have a viable engagement at all relevant senior levels within the Client organisation; and\r\nWe expect the client to behave collaboratively and operate an even handed commercial relationship."

                   },

                   {

                       "name": "high",

                       "id": 5,

                       "score": 3,

                       "description": "There is an effective and largely positive client engagement at the \"working\" (project/programme/portfolio) level and Sopra Steria have a viable engagement at most relevant senior levels within the Client organisation; and We expect the client to behave collaboratively and operate an even handed commercial relationship.\t\r\n"

                   },

                   {

                       "name": "medium",

                       "id": 6,

                       "score": 2,

                       "description": "The client relationship is either new or forming and client engagement is still being established at both the \"working\" level and at the relevant senior levels within the Client organisation; and/or The balance of probability suggests that the client will behave collaboratively and operate an even handed commercial relationship.\r\n"

                   },

                   {

                       "name": "low",

                       "id": 7,

                       "score": 1,

                       "description": "The Client relationship is difficult or deteriorating; and/or It is not certain that the client will behave collaboratively and operate an even handed commercial relationship.\r\n"

                   }

               ]

           },

           {

               "name": "Client Maturity",

               "description": "Project complexity and overall risk profile shall be influenced in respect of projects which are commissioned and executed for clients where the client’s organisational maturity and delivery capability is low.\r\nWhere the client has a low level of organisational maturity they will be less able to field a project team of the requisite experience and calibre; there may also be implications, for example, for the provision by the client of well elaborated requirements, their ability to manage and satisfy dependencies and to make timely, informed decisions; and to assess acceptance on an objective and rational basis.\r\nConsideration will have to be given to how the client will be managed, as an approach borne of clear definition and strict management of client dependencies may have to be adopted to mitigate delivery and commercial risk.",

               "id": 2,

               "impactDetails": {

                   "name": "Medium",

                   "id": 2,

                   "score": 2

               },

               "complexityScore": [

                   {

                       "name": "veryHigh",

                       "id": 8,

                       "score": 4,

                       "description": "The client has a high level of organisational maturity and is well able to field a project team of the requisite experience and calibre to provide well elaborated requirements, manage and satisfy dependencies and to make timely, informed decisions; and to assess acceptance on an objective and rational basis.\t\r\n"

                   },

                   {

                       "name": "high",

                       "id": 9,

                       "score": 3,

                       "description": "The client has a relatively high level of organisational maturity and should be well able to field a project team of the requisite experience and calibre to provide well elaborated requirements, manage and satisfy dependencies and to make timely, informed decisions; and to assess acceptance on an objective and rational basis.\t\r\n"

                   },

                   {

                       "name": "medium",

                       "id": 10,

                       "score": 2,

                       "description": "The client has a relatively low level of organisational maturity and there are concerns regarding their ability to field a project team of the requisite experience and calibre to provide well elaborated requirements, manage and satisfy dependencies and to make timely, informed decisions; and to assess acceptance on an objective and rational basis.\t\r\n"

                   },

                  {

                       "name": "low",

                       "id": 11,

                       "score": 1,

                       "description": "The client has a relatively low level of organisational maturity and there are definite risks regarding their ability to field a project team of the requisite experience and calibre to provide well elaborated requirements, manage and satisfy dependencies and to make timely, informed decisions; and to assess acceptance on an objective and rational basis.\t\r\n"

                   }

               ]

           }

       ]

   },

   {

       "id": 2,

       "name": "Project Factors",

       "subFactorDetails": [

           {

               "name": "Clarity of Scope/Requirements Definition",

               "description": "Consider the implications of the scope not being unambiguously defined - what work is required to better define the scope, what risks arise that threaten the planned timescales, the cost budget and client acceptance?\r\nThe impact upon project complexity of not having a well-defined scope is liable to be more acute if the project is being delivered on a Fixed Price basis and/or where there are penalties for late delivery. This may be less of a factor where a discovery phase has been agreed with the client and/or an appropriately robust set of assumptions have been defined and, should they be proven to not be valid, relevant commercial terms can be re-set.",

               "id": 3,

               "impactDetails": {

                   "name": "High",

                   "id": 1,

                   "score": 3

               },

               "complexityScore": [

                   {

                       "name": null,

                       "id": 12,

                       "score": null,

                       "description": "The project scope is clearly defined. No scope/requirement elaboration is required to be able to successfully plan, mobilise and deliver the project\r\n"

                   },

                   {

                       "name": null,

                       "id": 13,

                       "score": null,

                       "description": "The project scope is clearly defined. No scope/requirement elaboration is required to be able to successfully plan, mobilise and deliver the project\r\n"

                   },

                   {

                       "name": null,

                       "id": 14,

                       "score": null,

                       "description": "The project scope is not clearly defined. An appreciable level of more detailed scope/requirement elaboration is required to be able to successfully plan, mobilise and deliver the project\t\r\n"

                   },

                   {

                       "name": null,

                       "id": 15,

                       "score": null,

                       "description": "The project scope is not clearly defined. An appreciable level of more detailed scope/requirement elaboration is required to be able to successfully plan, mobilise and deliver the project\r\n"

                   }

               ]

           },

           {

               "name": "Complexity of the Contracted Solution",

               "description": "The complexity of the contracted solution is a factor that influences the overall complexity of the project and its risk profile.  Solution complexity can be multi-faceted and is, therefore, difficult to define in clear and precise terms.\r\nEach project will have to be carefully and individually assessed; factors to consider include:\r\n• The extent of organisational/”business” change engineered by the project\r\n• Functional complexity (defined in terms of such things as function point; user stories; use cases; functional requirements)\r\n• Technical complexity (examples including bespoke software development with complex algorithms; complex technical integration; new or “leading edge” technologies etc.)\r\n• The level of understanding of the client’s business and technology estates\r\nSolution complexity shall have less bearing on the overall complexity of projects where Sopra Steria have a proven track record of delivering solutions of the type that has been contracted. However, even where Sopra Steria has successfully delivered solutions of the type contracted, delivering the solution in to a (new) client environment for the first time will influence a higher level of complexity and additional risk factors.",

               "id": 4,

               "impactDetails": {

                   "name": "High",

                   "id": 1,

                   "score": 3

               },

               "complexityScore": [

                   {

                       "name": null,

                       "id": 16,

                       "score": null,

                       "description": "The contracted solution is regarded as having low complexity; Sopra Steria have a proven track record of successfully delivering solutions of this type and there is an existing organisational capability (experience, methods, tools) that can deliver the contracted solution"

                   },

                   {

                       "name": null,

                       "id": 17,

                       "score": null,

                       "description": "The contracted solution is regarded as having moderate complexity; Sopra Steria have a proven track record of successfully delivering solutions of this type and there is an existing organisational capability  (experience, methods, tools) that can deliver the contracted solution\r\n"

                   },

                   {

                       "name": null,

                       "id": 18,

                       "score": null,

                       "description": "The contracted solution is regarded as having moderate complexity; Sopra Steria have a proven track record of successfully delivering solutions of this type and there is an existing organisational capability  (experience, methods, tools) that can deliver the contracted solution\r\n"

                   },

                   {

                       "name": null,

                       "id": 19,

                       "score": null,

                       "description": "The contracted solution is regarded as having moderate complexity; Sopra Steria have a proven track record of successfully delivering solutions of this type and there is an existing organisational capability  (experience, methods, tools) that can deliver the contracted solution\r\n"

                   }

               ]

           },

           {

               "name": "Total Cost of Project Delivery",

               "description": "The total cost of the project delivery excludes any on-going service provision that has been contracted, reflecting the project cost budget for project delivery from contracts being agreed with the client through to a final client acceptance in to service.\r\nIt is largely a reflection of the overall project complexity more often than a complexity factor in its own right, but will have greater significance in respect of project complexity where project delivery is being undertaken on a Fixed Price basis.",

               "id": 5,

               "impactDetails": {

                   "name": "Low",

                   "id": 3,

                   "score": 1

               },

               "complexityScore": [

                   {

                       "name": null,

                       "id": 20,

                       "score": null,

                       "description": "Total Cost of Project Delivery < £250k"

                   },

                   {

                       "name": null,

                       "id": 21,

                       "score": null,

                       "description": "Total Cost of Project Delivery > £250k and < £500k"

                   },

                   {

                       "name": null,

                       "id": 22,

                       "score": null,

                       "description": "Total Cost of Project Delivery > £500k and < £5M"

                   },

                   {

                       "name": null,

                       "id": 23,

                       "score": null,

                       "description": "Total Cost of Project Delivery > £5M"

                   }

               ]

           },

           {

               "name": "Project Team Size",

               "description": "Sopra Steria Project Managers shall often perform end-to-end project management roles where they engage, manage and direct client, subcontractor and/or 3rd party teams, even though this element of project delivery is not always explicitly contracted. The Project Management span of control (the Project Team Size) therefore includes all project resources for which the Project Manager provides engagement and direction in pursuance of the delivery of the project.\r\nThe project team size is largely a reflection of the overall project complexity more often than a complexity factor in its own right.",

               "id": 6,

               "impactDetails": {

                   "name": "Low",

                   "id": 3,

                   "score": 1

               },

               "complexityScore": [

                   {

                       "name": null,

                       "id": 24,

                       "score": null,

                       "description": "Project Team Size < 11 team members"

                   },

                   {

                       "name": null,

                       "id": 25,

                       "score": null,

                       "description": "Project Team Size > 10  and less than < 31 team members"

                   },

                   {

                       "name": null,

                       "id": 26,

                       "score": null,

                       "description": "Project Team Size > 30  and less than < 50 team members Project team is matrixed"

                   },

                   {

                       "name": null,

                       "id": 27,

                       "score": null,

                       "description": "Project Team Size > 50 team members Project team is heavily matrixed and spread across multiple locations"

                   }

               ]

           },

           {

               "name": "Project Team Locations",

               "description": "As above, the Project Team includes all project resources for which the Project Manager provides engagement and direction in pursuance of the delivery of the project.\r\nIn addition to the size of the overall project team, the geographic diversity of team locations will also influence the overall project complexity.  For example, a project team co-located in a single premise within close proximity to the client is a considerably less complex scenario when compared to a project team spread over a number of different locations, particularly if some of the locations are outside of the UK, or not within easy reach from the 'main' project delivery location.",

               "id": 7,

               "impactDetails": {

                   "name": "Low",

                   "id": 3,

                   "score": 1

               },

               "complexityScore": [

                   {

                       "name": null,

                       "id": 28,

                       "score": null,

                       "description": "The Project Team is co-located within a single UK-based site"

                   },

                   {

                       "name": null,

                       "id": 29,

                       "score": null,

                       "description": "The Project Team is split across two sites"

                   },

                   {

                       "name": null,

                       "id": 30,

                       "score": null,

                       "description": "The Project Team is split across more than two sites"

                   },

                   {

                       "name": null,

                       "id": 31,

                       "score": null,

                       "description": "The Project Team is split across more than two sites and includes client and/or subcontractor teams that are located outside of the UK"

                   }

               ]

           },

           {

               "name": "Basis of Planning",

               "description": "In a similar fashion to the Total Cost of Project Delivery (above) the project delivery phase represents the duration between contracts being agreed with the client through to a final client acceptance in to service.\r\nThe project delivery duration is largely a reflection of the overall project complexity more often than a complexity factor in its own right. In reality, projects of short duration will often have greater complexity than projects of long duration.\r\nThe critical complexity factor is the basis upon which the project duration and the project milestones have been derived and the level of contingency within the project plan.",

               "id": 8,

               "impactDetails": {

                   "name": "Medium",

                   "id": 2,

                   "score": 2

               },

               "complexityScore": [

                   {

                       "name": null,

                       "id": 32,

                       "score": null,

                       "description": "The project milestones have been proposed by Steria; and have been derived on the basis of a detailed and appropriately robust project plan that affords a comfortable level of contingency\r\n"

                   },

                   {

                       "name": null,

                       "id": 33,

                       "score": null,

                       "description": "The project milestones have been proposed by Steria; and have been derived on the basis of a detailed and appropriately robust project plan that affords a reasonable level of contingency\r\n"

                   },

                   {

                       "name": null,

                       "id": 34,

                       "score": null,

                       "description": "The project milestones have been largely dictated by the client; and/or The project milestones have been derived on the basis of a high-level project plan that affords a limited amount of contingency\r\n"

                   },

                   {

                       "name": null,

                       "id": 35,

                       "score": null,

                       "description": "The project milestones have been dictated by the client; and/or The project milestones have been derived on the basis of a high-level project plan that affords little or no contingency\r\n"

                   }

               ]

           }

       ]

   },

   {

       "id": 3,

       "name": "Commercial Factors",

       "subFactorDetails": [

           {

               "name": "Business Criticality/Reputational Risk",

               "description": "Project complexity and overall risk profile shall be influenced in respect of projects which are regarded as \"business critical\" by either or both Sopra Steria and the client: where Sopra Steria regard the project as an opportunity to gain a foothold within a new market or develop a long-term relationship with a new client additional stakeholder interest shall come to bear and the success of the project may be judged on additional success criteria, such as client satisfaction, as well as the conventional \"on time, within budget....\" definitions; where the client regards the project as having strategic importance or delivering significant business benefits the nature and extent of stakeholder engagement and client management shall increase.\r\nWhere the \"win price\" squeezes margin (and hence puts pressure on the cost base) or reputational risk is a key consideration additional resource and effort will have to be factored in to appropriately robust risk mitigation activities.",

               "id": 9,

               "impactDetails": {

                   "name": "Medium",

                   "id": 2,

                   "score": 2

               },

               "complexityScore": [

                   {

                       "name": null,

                       "id": 36,

                       "score": null,

                       "description": "The project is not regarded by either Sopra Steria or the Client as \"business critical\"; the reputational risk has been assessed as low\r\n"

                   },

                   {

                       "name": null,

                       "id": 37,

                       "score": null,

                       "description": "The project is not regarded by either Sopra Steria or the Client as \"business critical\"; the reputational risk has been assessed as moderate\r\n"

                   },

                   {

                       "name": null,

                       "id": 38,

                       "score": null,

                       "description": "The project has considerable business criticality to either or both Sopra Steria and the Client; there is an appreciable level of reputational risk\r\n"

                   },

                   {

                       "name": null,

                       "id": 39,

                       "score": null,

                       "description": "The project has significant business criticality to either or both Sopra Steria and the Client; there is either a high or very high level of reputational risk"

                   }

               ]

           },

           {

               "name": "Complexity of Commercial Terms",

               "description": "Guidance should always be sought from the appointed commercial lead where an assessment of the nature and complexity of the contract/commercial terms is being sought.\r\nRelevant aspects will include how well the contract is defined and the extent to which it commits Sopra Steria (such as defined outcomes, onerous obligations, challenging milestones, penalties, service credit regimes, rights to terminate) versus the room we have for manoeuvre (such as a discovery phase has been scoped, the contract has appropriate assumptions with an ability to re-set should assumptions be not valid; ability to fully flow down to suppliers). \r\nProject complexity shall be highest where the commercial team have identified complexity within the commercial terms agreed with the client and/or where there are potential penalties that can be imposed by the client.",

               "id": 10,

               "impactDetails": {

                   "name": "High",

                   "id": 1,

                   "score": 3

               },

               "complexityScore": [

                   {

                       "name": null,

                       "id": 40,

                       "score": null,

                       "description": "The project will be commissioned and delivered within the context of an existing, balanced contractual relationship, reinforced by ample assumptive/dependency coverage and well-defined milestone acceptance criteria\r\n"

                   },

                   {

                       "name": null,

                       "id": 41,

                       "score": null,

                       "description": "The project will be commissioned and delivered within the context of a new contractual relationship, or where the existing contractual relationship has been subject to a degree of negotiated amendment (to include liquidated damages provisions, for example), supported by adequate assumptive/dependency coverage and defined milestone acceptance criteria\r\n"

                   },

                   {

                       "name": null,

                       "id": 42,

                       "score": null,

                       "description": "The project will be delivered under lightly negotiated contractual terms, which include specific components (such as a Parent Company Guarantee, or ill-defined scope) which lead to the commercial risk being regarded as high\r\n"

                   },

                   {

                       "name": null,

                       "id": 43,

                       "score": null,

                       "description": "The project will be delivered under mandated contractual terms, which include adverse elements (such as a disproportionately high Limit of Liability), and/or where there is an unusual business context (a thin prime structure, with a high degree of subcontractor reliance say) which lead to the commercial risk being regarded as very high"

                   }

               ]

           },

           {

               "name": "Engagement of Subcontractors",

               "description": "Guidance should always be sought from Procurement and  the relevant commercial lead where an assessment of the nature and complexity of the subcontract terms is being sought.\r\nFactors that most influence project complexity include the number of subcontractors engaged  their geography (within the UK versus outside the UK), whether or not Sopra Steria have an existing relationship/track record with the subcontractor and the nature (value, scope, complexity, commercial terms) of the subcontracts. Relevant aspects will include: \r\na) the extent of commercial leverage that we have on our subcontractors (e.g. have we flowed down the key head contract terms and obligations, including any penalties to them if they fail to deliver; have they agreed to an appropriately detailed set of dependencies; are we a strategic client etc.); \r\nb) the subcontractors' geography (non UK based subcontractors present increased complexity);  \r\nc) the scale of subcontractor engagement (i.e. what proportion of the overall project scope has been subcontracted);\r\nd) the criticality of the supplier in the solution; and \r\ne) the number of alternate suppliers capable of meeting the requirements; who could form a continuity solution in instances of severe supplier failure \r\nA key consideration in respect of subcontractor engagement is the extent to which the subcontract enables Sopra Steria to objectively measure and assure subcontractor progress versus schedule and the quality and integrity of subcontractor deliverables.\r\nSubcontractor due diligence must also establish the commercial and financial viability of each subcontractor engaged.",

               "id": 11,

               "impactDetails": {

                   "name": "High",

                   "id": 1,

                   "score": 3

               },

               "complexityScore": [

                   {

                       "name": null,

                       "id": 44,

                       "score": null,

                       "description": "The proportion of the contracted solution that is to be subcontracted represents less than 10% of the overall solution; and/or No more than one subcontractor engaged; and Sopra Steria have an existing relationship with the subcontractor and subcontract terms are not regarded as complex\r\n"

                   },

                   {

                       "name": null,

                       "id": 45,

                       "score": null,

                       "description": "The proportion of the contracted solution that is to be subcontracted represents less than 30% of the overall solution; and No more than two subcontractors engaged; Sopra Steria have an existing relationship with both subcontractors and subcontract terms are not regarded as complex\r\n"

                   },

                   {

                       "name": null,

                       "id": 46,

                       "score": null,

                       "description": "The proportion of the contracted solution that is to be subcontracted represents more than 30% of the overall solution; and/or; and/or Sopra Steria have engaged a  critical supplier where there are few alternatives in the market place; and / or one or more subcontractors have been engaged where Sopra Steria do not have an existing relationship; and/or One or more subcontractors have been engaged where the subcontract terms are regarded as having an appreciable level of complexity\r\n"

                   },

                   {

                       "name": null,

                       "id": 47,

                       "score": null,

                       "description": "The proportion of the contracted solution that is to be subcontracted represents more than 50% of the overall solution; and/or Sopra Steria have engaged a  critical partner to deliver the project who is the only supplier in the market place who can meet our requirements; and/or More than one subcontractors have been engaged where Sopra Steria do not have an existing relationship; and/or One or more of the subcontract terms are regarded as having either a high or very high level of complexity\r\n"

                   }

               ]

           },

           {

               "name": "Reliance Upon Client Dependencies, 3rd Parties & Stakeholders",

               "description": "Project complexity and overall risk profile shall be influenced by the extent to which Sopra Steria’s ability to successfully deliver the project is heavily dependent upon the Client meeting their dependencies, with the requisite outcomes within the required timescales.\r\nOur projects will typically be predicated upon a number of client dependencies; it is the number of client dependencies, the nature of the client dependencies and their criticality towards project success that shall influence the complexity of individual projects.\r\nConsideration needs to be given not just to our dependencies upon the client themselves, but also to those subcontractors, third parties and stakeholder groups where Sopra Steria have no direct control or influence over their activities, deliverables or timescales.\r\nUnder such circumstances it is critical that the contractual framework incorporates well defined and measurable client dependencies, and offers us remedy for late or missed client dependencies.",

               "id": 12,

               "impactDetails": {

                   "name": "Medium",

                   "id": 2,

                   "score": 2

               },

               "complexityScore": [

                   {

                       "name": null,

                       "id": 48,

                       "score": null,

                       "description": "Sopra Steria’s ability to successfully deliver the project is not to any extent dependent upon the Client (or their subcontractors, Third Parties or Stakeholder Groups) meeting their dependencies with the requisite outcomes on or before required dates.\r\n"

                  },

                   {

                       "name": null,

                       "id": 49,

                       "score": null,

                       "description": "Sopra Steria’s ability to successfully deliver the project is dependent to a limited extent upon  the Client (or their subcontractors, Third Parties or Stakeholder Groups) meeting their dependencies with the requisite outcomes on or before required dates.\r\n"

                   },

                   {

                       "name": null,

                       "id": 50,

                       "score": null,

                       "description": "Sopra Steria’s ability to successfully deliver the project is dependent to an appreciable extent upon  the Client (or their subcontractors, Third Parties or Stakeholder Groups) meeting their dependencies with the requisite outcomes on or before required dates.\r\n"

                   },

                   {

                       "name": null,

                       "id": 51,

                       "score": null,

                       "description": "Sopra Steria’s ability to successfully deliver the project is dependent to either a high or very high extent upon  the Client (or their subcontractors, Third Parties or Stakeholder Groups) meeting their dependencies with the requisite outcomes on or before required dates.\r\n"

                   }

               ]

           }

       ]

   },

   {

       "id": 4,

       "name": "Capability Factors",

       "subFactorDetails": [

           {

               "name": "Resource Capacity & Capability",

               "description": "Mobilising a project and maintaining throughout project delivery a fully resourced project team is one of the key project management disciplines.  It is critical that there is an understanding of both the resource capacity required and the specific capability that is required to successfully deliver the project. For certain sectors sectoral knowledge, accreditations and clearances are critical.\r\nIn specific regard to project complexity the terms resource capacity and capability are taken to mean: \r\na) Capacity is focused upon ensuring that there is a sufficient number of project resources engaged to appropriately balance the project delivery imperatives and the projects' cost budget; and \r\nb) Capability is focused upon ensuring that all project team members have the experience and skills required to effectively discharge their role within the project team.\r\nProject complexity will be most influenced by factors such as whether or not the project requires niche skills that are not readily available within Sopra Steria; and where large project teams need to be mobilised in short, challenging timescales.",

               "id": 13,

               "impactDetails": {

                   "name": "Medium",

                   "id": 2,

                   "score": 2

               },

               "complexityScore": [

                   {

                       "name": null,

                       "id": 52,

                       "score": null,

                       "description": "The requisite skills and experience necessary for project delivery are readily available within the Sector / Business Unit\r\n"

                   },

                   {

                       "name": null,

                       "id": 53,

                       "score": null,

                       "description": "The requisite skills and experience necessary for project delivery are readily available within the Sopra Steria organisation\r\n"

                   },

                   {

                       "name": null,

                       "id": 54,

                       "score": null,

                       "description": "The requisite skills and experience for some project roles is not readily available within Sopra Steria and will have to be fulfilled by contract resource; 3rd Party and/or Subcontractors\r\n"

                   },

                   {

                       "name": null,

                       "id": 55,

                       "score": null,

                       "description": "The requisite skills and experience for a considerable number of project roles is not readily available within Sopra Steria and will have to be fulfilled by contract resource; 3rd Party and/or Subcontractors"

                   }

               ]

           },

           {

               "name": "Delivery Methodology",

               "description": "Project complexity will increase in environments where a delivery methodology has been selected for which Sopra Steria do not have a well-defined and proven methodology, under-pinned and enabled by appropriate tooling, configured for the purpose in hand.\r\nThe scenario above will impede progress against the project plan and is likely to necessitate the need to ‘buy in’ external resource with methodology and tooling expertise.",

               "id": 14,

               "impactDetails": {

                   "name": "Medium",

                   "id": 2,

                   "score": 2

               },

               "complexityScore": [

                   {

                       "name": null,

                       "id": 56,

                       "score": null,

                       "description": "For the delivery methodology that has been selected for project delivery Sopra Steria have a well-defined and proven methodology, under-pinned and enabled by appropriate tooling, configured for the purpose in hand.\r\n"

                   },

                   {

                       "name": null,

                       "id": 57,

                       "score": null,

                       "description": "For the delivery methodology that has been selected for project delivery Sopra Steria have a well-defined and proven methodology. The methodology is well supported by appropriate tooling, which requires little configuration/work around for the purpose in hand.\r\n"

                   },

                   {

                       "name": null,

                       "id": 58,

                       "score": null,

                       "description": "For the delivery methodology that has been selected for project delivery Sopra Steria have a high-level definition and a level of understanding and previous experience. The methodology is supported to an extent by appropriate tooling, appreciable configuration/work around is required for the purpose in hand.\r\n"

                   },

                   {

                       "name": null,

                       "id": 59,

                      "score": null,

                       "description": "For the delivery methodology that has been selected for project delivery Sopra Steria have an outline definition (or less) and a low level of understanding and previous experience. The methodology is not well supported by appropriate tooling – new tooling is required, or a high or very level of configuration/work around is required - for the purpose in hand.\t\r\n"

                   }

               ]

           }

       ]

   }

],



     pctData:{
        "Client factors":{
           "clientRelationship":{
              "name":"Client Relationship",
              "impact":"Medium",
              "description":"Project complexity and overall risk profile shall be influenced in respect of: projects which are commissioned and executed for clients where the client relationship is new or forming; or an existing client relationship is deteriorating; or the client behaviour / culture is not conducive to effective partnership working. Conversely, there is the least amount of project complexity where there is already an effective and positive client engagement at the \"working\" (project/programme/portfolio) level and Sopra Steria have a viable engagement at all relevant senior levels within the client organisation.",
              "low":"There is an effective and positive client engagement at the \"working\" (project/programme/portfolio) level and Sopra Steria have a viable engagement at all relevant senior levels within the Client organisation; and We expect the client to behave collaboratively and operate an even handed commercial relationship.",
              "medium":"There is an effective and largely positive client engagement at the \"working\" (project/programme/portfolio) level and Sopra Steria have a viable engagement at most relevant senior levels within the Client organisation; and We expect the client to behave collaboratively and operate an even handed commercial relationship.",
              "high":"The client relationship is either new or forming and client engagement is still being established at both the \"working\" level and at the relevant senior levels within the Client organisation; and/or The balance of probability suggests that the client will behave collaboratively and operate an even handed commercial relationship.",
              "veryHigh":"The Client relationship is difficult or deteriorating; and/or It is not certain that the client will behave collaboratively and operate an even handed commercial relationship."
           },
           "clientMaturity":{
              "name":"Client Maturity",
              "impact":"Medium",
              "description":"Project complexity and overall risk profile shall be influenced in respect of projects which are commissioned and executed for clients where the client’s organisational maturity and delivery capability is low. Where the client has a low level of organisational maturity they will be less able to field a project team of the requisite experience and calibre; there may also be implications, for example, for the provision by the client of well elaborated requirements, their ability to manage and satisfy dependencies and to make timely, informed decisions; and to assess acceptance on an objective and rational basis. Consideration will have to be given to how the client will be managed, as an approach borne of clear definition and strict management of client dependencies may have to be adopted to mitigate delivery and commercial risk.",
              "low":"The client has a high level of organisational maturity and is well able to field a project team of the requisite experience and calibre to provide well elaborated requirements, manage and satisfy dependencies and to make timely, informed decisions; and to assess acceptance on an objective and rational basis.",
              "medium":"The client has a relatively high level of organisational maturity and should be well able to field a project team of the requisite experience and calibre to provide well elaborated requirements, manage and satisfy dependencies and to make timely, informed decisions; and to assess acceptance on an objective and rational basis.",
              "high":"The client has a relatively low level of organisational maturity and there are concerns regarding their ability to field a project team of the requisite experience and calibre to provide well elaborated requirements, manage and satisfy dependencies and to make timely, informed decisions; and to assess acceptance on an objective and rational basis.",
              "veryHigh":"The client has a relatively low level of organisational maturity and there are definite risks regarding their ability to field a project team of the requisite experience and calibre to provide well elaborated requirements, manage and satisfy dependencies and to make timely, informed decisions; and to assess acceptance on an objective and rational basis."
           }
        },
        "Project factors":{
           "scopeClarity":{
              "name":"Clarity of Scope/Requirements Definition",
              "impact":"High",
              "description":"Consider the implications of the scope not being unambiguously defined - what work is required to better define the scope, what risks arise that threaten the planned timescales, the cost budget and client acceptance? The impact upon project complexity of not having a well-defined scope is liable to be more acute if the project is being delivered on a Fixed Price basis and/or where there are penalties for late delivery. This may be less of a factor where a discovery phase has been agreed with the client and/or an appropriately robust set of assumptions have been defined and, should they be proven to not be valid, relevant commercial terms can be re-set.",
              "low":"The project scope is clearly defined. No scope/requirement elaboration is required to be able to successfully plan, mobilise and deliver the project No scope/requirement elaboration is required to be able to successfully plan, mobilise and deliver the project",
              "medium":"The project scope is well defined. Limited scope/requirement elaboration is required to be able to successfully plan, mobilise and deliver the project",
              "high":"The project scope is not clearly defined. An appreciable level of more detailed scope/requirement elaboration is required to be able to successfully plan, mobilise and deliver the project",
              "veryHigh":"The project scope is not clearly defined. A high or very high degree of further scope/requirement elaboration is required to be able to successfully plan, mobilise and deliver the project."
           },
           "solutionComplexity":{
              "name":"Complexity of the Contracted Solution",
              "impact":"High",
              "description":"The complexity of the contracted solution is a factor that influences the overall complexity of the project and its risk profile.  Solution complexity can be multi-faceted and is, therefore, difficult to define in clear and precise terms. Each project will have to be carefully and individually assessed; factors to consider include: • The extent of organisational/”business” change engineered by the project• Functional complexity (defined in terms of such things as function point; user stories; use cases; functional requirements) • Technical complexity (examples including bespoke software development with complex algorithms; complex technical integration; new or “leading edge” technologies etc.)• The level of understanding of the client’s business and technology estates Solution complexity shall have less bearing on the overall complexity of projects where Sopra Steria have a proven track record of delivering solutions of the type that has been contracted. However, even where Sopra Steria has successfully delivered solutions of the type contracted, delivering the solution in to a (new) client environment for the first time will influence a higher level of complexity and additional risk factors.",
              "low":"The contracted solution is regarded as having low complexity; Sopra Steria have a proven track record of successfully delivering solutions of this type and there is an existing organisational capability (experience, methods, tools) that can deliver the contracted solution",
              "medium":"The contracted solution is regarded as having moderate complexity; Sopra Steria have a proven track record of successfully delivering solutions of this type and there is an existing organisational capability  (experience, methods, tools) that can deliver the contracted solution",
              "high":"The contracted solution has considerable complexity and solution factors indicate that there is an appreciable level of delivery risk as a consequence.",
              "veryHigh":"The contracted solution has significant complexity and solution factors indicate that there is either a high or very high level of delivery risk as a consequence."
           },
           "totalCost":{
              "name":"Total Cost of Project Delivery",
              "impact":"Low",
              "description":"The total cost of the project delivery excludes any on-going service provision that has been contracted, reflecting the project cost budget for project delivery from contracts being agreed with the client through to a final client acceptance in to service. It is largely a reflection of the overall project complexity more often than a complexity factor in its own right, but will have greater significance in respect of project complexity where project delivery is being undertaken on a Fixed Price basis.",
              "low":"Total Cost of Project Delivery < £250k",
              "medium":"Total Cost of Project Delivery > £250k and < £500k",
              "high":"Total Cost of Project Delivery > £500k and < £5M",
              "veryHigh":"Total Cost of Project Delivery > £5M"
           },
           "teamSize":{
              "name":"Project Team Size",
              "impact":"Low",
              "description":"Sopra Steria Project Managers shall often perform end-to-end project management roles where they engage, manage and direct client, subcontractor and/or 3rd party teams, even though this element of project delivery is not always explicitly contracted. The Project Management span of control (the Project Team Size) therefore includes all project resources for which the Project Manager provides engagement and direction in pursuance of the delivery of the project. The project team size is largely a reflection of the overall project complexity more often than a complexity factor in its own right.",
              "low":"Project Team Size < 11 team members.",
              "medium":"Project Team Size > 10  and less than < 31 team members",
              "high":"Project Team Size > 30  and less than < 50 team members Project team is matrixed",
              "veryHigh":"Project Team Size > 50 team members Project team is heavily matrixed and spread across multiple locations"
           },
           "teamLocation":{
              "name":"Project Team Locations",
              "impact":"Low",
              "description":"As above, the Project Team includes all project resources for which the Project Manager provides engagement and direction in pursuance of the delivery of the project. In addition to the size of the overall project team, the geographic diversity of team locations will also influence the overall project complexity.  For example, a project team co-located in a single premise within close proximity to the client is a considerably less complex scenario when compared to a project team spread over a number of different locations, particularly if some of the locations are outside of the UK, or not within easy reach from the 'main' project delivery location.",
              "low":"The Project Team is co-located within a single UK-based site",
              "medium":"The Project Team is split across two sites",
              "high":"The Project Team is split across more than two sites",
              "veryHigh":"The Project Team is split across more than two sites and includes client and/or subcontractor teams that are located outside of the UK."
           },
           "planningBasis":{
              "name":"Basis of Planning",
              "impact":"Medium",
              "description":"In a similar fashion to the Total Cost of Project Delivery (above) the project delivery phase represents the duration between contracts being agreed with the client through to a final client acceptance in to service. The project delivery duration is largely a reflection of the overall project complexity more often than a complexity factor in its own right. In reality, projects of short duration will often have greater complexity than projects of long duration.The critical complexity factor is the basis upon which the project duration and the project milestones have been derived and the level of contingency within the project plan.",
              "low":"The project milestones have been proposed by Steria; and have been derived on the basis of a detailed and appropriately robust project plan that affords a comfortable level of contingency",
              "medium":"The project milestones have been proposed by Steria; and have been derived on the basis of a detailed and appropriately robust project plan that affords a reasonable level of contingency",
              "high":"The project milestones have been largely dictated by the client; and/or The project milestones have been derived on the basis of a high-level project plan that affords a limited amount of contingency",
              "veryHigh":"The project milestones have been dictated by the client; and/or The project milestones have been derived on the basis of a high-level project plan that affords little or no contingency."
           },
     
        },
        "Commercial factors":{
           "businessCriticality":{
              "name":"Business Criticality/Reputational Risk",
              "impact":"Medium",
              "description":"Project complexity and overall risk profile shall be influenced in respect of projects which are regarded as \"business critical\" by either or both Sopra Steria and the client: where Sopra Steria regard the project as an opportunity to gain a foothold within a new market or develop a long-term relationship with a new client additional stakeholder interest shall come to bear and the success of the project may be judged on additional success criteria, such as client satisfaction, as well as the conventional \"on time, within budget....\" definitions; where the client regards the project as having strategic importance or delivering significant business benefits the nature and extent of stakeholder engagement and client management shall increase. Where the \"win price\" squeezes margin (and hence puts pressure on the cost base) or reputational risk is a key consideration additional resource and effort will have to be factored in to appropriately robust risk mitigation activities.",
              "low":"The project is not regarded by either Sopra Steria or the Client as \"business critical\"; the reputational risk has been assessed as low.",
              "medium":"The project is not regarded by either Sopra Steria or the Client as \"business critical\"; the reputational risk has been assessed as moderate.",
              "high":"The project has considerable business criticality to either or both Sopra Steria and the Client; there is an appreciable level of reputational risk.",
              "veryHigh":"The project has significant business criticality to either or both Sopra Steria and the Client; there is either a high or very high level of reputational risk"
           },
           "commercialTeamComplexity":{
              "name":"Complexity of Commercial Terms",
              "impact":"High",
              "description":"Guidance should always be sought from the appointed commercial lead where an assessment of the nature and complexity of the contract/commercial terms is being sought. Relevant aspects will include how well the contract is defined and the extent to which it commits Sopra Steria (such as defined outcomes, onerous obligations, challenging milestones, penalties, service credit regimes, rights to terminate) versus the room we have for manoeuvre (such as a discovery phase has been scoped, the contract has appropriate assumptions with an ability to re-set should assumptions be not valid; ability to fully flow down to suppliers). Project complexity shall be highest where the commercial team have identified complexity within the commercial terms agreed with the client and/or where there are potential penalties that can be imposed by the client.",
              "low":"The project will be commissioned and delivered within the context of an existing, balanced contractual relationship, reinforced by ample assumptive/dependency coverage and well-defined milestone acceptance criteria",
              "medium":"The project will be commissioned and delivered within the context of a new contractual relationship, or where the existing contractual relationship has been subject to a degree of negotiated amendment (to include liquidated damages provisions, for example), supported by adequate assumptive/dependency coverage and defined milestone acceptance criteria",
              "high":"The project will be delivered under lightly negotiated contractual terms, which include specific components (such as a Parent Company Guarantee, or ill-defined scope) which lead to the commercial risk being regarded as high",
              "veryHigh":"The project will be delivered under mandated contractual terms, which include adverse elements (such as a disproportionately high Limit of Liability), and/or where there is an unusual business context (a thin prime structure, with a high degree of subcontractor reliance say) which lead to the commercial risk being regarded as very high."
           },
           "subcontractorsEngagement":{
              "name":"Engagement of Subcontractors",
              "impact":"High",
              "description":"Guidance should always be sought from Procurement and  the relevant commercial lead where an assessment of the nature and complexity of the subcontract terms is being sought. Factors that most influence project complexity include the number of subcontractors engaged  their geography (within the UK versus outside the UK), whether or not Sopra Steria have an existing relationship/track record with the subcontractor and the nature (value, scope, complexity, commercial terms) of the subcontracts. Relevant aspects will include: a) the extent of commercial leverage that we have on our subcontractors (e.g. have we flowed down the key head contract terms and obligations, including any penalties to them if they fail to deliver; have they agreed to an appropriately detailed set of dependencies; are we a strategic client etc.); b) the subcontractors' geography (non UK based subcontractors present increased complexity); c) the scale of subcontractor engagement (i.e. what proportion of the overall project scope has been subcontracted); d) the criticality of the supplier in the solution; and e) the number of alternate suppliers capable of meeting the requirements; who could form a continuity solution in instances of severe supplier failure A key consideration in respect of subcontractor engagement is the extent to which the subcontract enables Sopra Steria to objectively measure and assure subcontractor progress versus schedule and the quality and integrity of subcontractor deliverables. Subcontractor due diligence must also establish the commercial and financial viability of each subcontractor engaged.",
              "low":"The project will be commissioned and delivered within the context of an existing, balanced contractual relationship, reinforced by ample assumptive/dependency coverage and well-defined milestone acceptance criteria",
              "medium":"The project will be commissioned and delivered within the context of a new contractual relationship, or where the existing contractual relationship has been subject to a degree of negotiated amendment (to include liquidated damages provisions, for example), supported by adequate assumptive/dependency coverage and defined milestone acceptance criteria.",
              "high":"The project will be delivered under lightly negotiated contractual terms, which include specific components (such as a Parent Company Guarantee, or ill-defined scope) which lead to the commercial risk being regarded as high",
              "veryHigh":"The project will be delivered under mandated contractual terms, which include adverse elements (such as a disproportionately high Limit of Liability), and/or where there is an unusual business context (a thin prime structure, with a high degree of subcontractor reliance say) which lead to the commercial risk being regarded as very high."
           },
           "relianceAndDependencies":{
              "name":"Reliance Upon Client Dependencies, 3rd Parties & Stakeholders",
              "impact":"Medium",
              "description":"Project complexity and overall risk profile shall be influenced by the extent to which Sopra Steria’s ability to successfully deliver the project is heavily dependent upon the Client meeting their dependencies, with the requisite outcomes within the required timescales. Our projects will typically be predicated upon a number of client dependencies; it is the number of client dependencies, the nature of the client dependencies and their criticality towards project success that shall influence the complexity of individual projects. Consideration needs to be given not just to our dependencies upon the client themselves, but also to those subcontractors, third parties and stakeholder groups where Sopra Steria have no direct control or influence over their activities, deliverables or timescales. Under such circumstances it is critical that the contractual framework incorporates well defined and measurable client dependencies, and offers us remedy for late or missed client dependencies",
              "low":"The proportion of the contracted solution that is to be subcontracted represents less than 10% of the overall solution; and/or No more than one subcontractor engaged; and Sopra Steria have an existing relationship with the subcontractor and subcontract terms are not regarded as complex.",
              "medium":"The proportion of the contracted solution that is to be subcontracted represents less than 30% of the overall solution; and No more than two subcontractors engaged; Sopra Steria have an existing relationship with both subcontractors and subcontract terms are not regarded as complex.",
              "high":"The proportion of the contracted solution that is to be subcontracted represents more than 30% of the overall solution; and/or; and/or Sopra Steria have engaged a  critical supplier where there are few alternatives in the market place; and / or one or more subcontractors have been engaged where Sopra Steria do not have an existing relationship; and/or One or more subcontractors have been engaged where the subcontract terms are regarded as having an appreciable level of complexity",
              "veryHigh":"The proportion of the contracted solution that is to be subcontracted represents more than 50% of the overall solution; and/or Sopra Steria have engaged a  critical partner to deliver the project who is the only supplier in the market place who can meet our requirements; and/or More than one subcontractors have been engaged where Sopra Steria do not have an existing relationship; and/or One or more of the subcontract terms are regarded as having either a high or very high level of complexity."
           },
     
        },
        "Capability factors":{
           "resourceCapacityCapability":{
              "name":"Resource Capacity & Capability",
              "impact":"Medium",
              "description":"Mobilising a project and maintaining throughout project delivery a fully resourced project team is one of the key project management disciplines.  It is critical that there is an understanding of both the resource capacity required and the specific capability that is required to successfully deliver the project. For certain sectors sectoral knowledge, accreditations and clearances are critical. In specific regard to project complexity the terms resource capacity and capability are taken to mean: a) Capacity is focused upon ensuring that there is a sufficient number of project resources engaged to appropriately balance the project delivery imperatives and the projects' cost budget; and b) Capability is focused upon ensuring that all project team members have the experience and skills required to effectively discharge their role within the project team. Project complexity will be most influenced by factors such as whether or not the project requires niche skills that are not readily available within Sopra Steria; and where large project teams need to be mobilised in short, challenging timescales.",
              "low":"The requisite skills and experience necessary for project delivery are readily available within the Sector / Business Unit.",
              "medium":"The requisite skills and experience necessary for project delivery are readily available within the Sopra Steria organisation.",
              "high":"The requisite skills and experience for some project roles is not readily available within Sopra Steria and will have to be fulfilled by contract resource; 3rd Party and/or Subcontractors.",
              "veryHigh":"The requisite skills and experience for a considerable number of project roles is not readily available within Sopra Steria and will have to be fulfilled by contract resource; 3rd Party and/or Subcontractors."
           },
           "deliveryMethodology":{
              "name":"Delivery Methodology",
              "impact":"Medium",
              "description":"Project complexity will increase in environments where a delivery methodology has been selected for which Sopra Steria do not have a well-defined and proven methodology, under-pinned and enabled by appropriate tooling, configured for the purpose in hand. The scenario above will impede progress against the project plan and is likely to necessitate the need to ‘buy in’ external resource with methodology and tooling expertise.",
              "low":"For the delivery methodology that has been selected for project delivery Sopra Steria have a well-defined and proven methodology, under-pinned and enabled by appropriate tooling, configured for the purpose in hand.",
              "medium":"For the delivery methodology that has been selected for project delivery Sopra Steria have a well-defined and proven methodology. The methodology is well supported by appropriate tooling, which requires little configuration/work around for the purpose in hand.",
              "high":"For the delivery methodology that has been selected for project delivery Sopra Steria have a high-level definition and a level of understanding and previous experience. The methodology is supported to an extent by appropriate tooling, appreciable configuration/work around is required for the purpose in hand.",
              "veryHigh":"For the delivery methodology that has been selected for project delivery Sopra Steria have an outline definition (or less) and a low level of understanding and previous experience. The methodology is not well supported by appropriate tooling – new tooling is required, or a high or very level of configuration/work around is required - for the purpose in hand."
           }
        }
     },
     fastrackHeaderText:'Fast Track Assessment',
     fastrackQuestion:[
        'This engagement is a change against an existing account-based portfolio',
        'The commercial terms are well established, well understood, and do not feature penalties for late delivery',
        'This engagement is to be delivered by an existing Sopra Steria resource pool who understand the client environment',
        'We do not need to engage new subcontractors to deliver this engagement',
        'The cost of delivering the change does not exceed the “DCR delegated authority” thresholds (or equivalent) for the sector/joint venture',
        'The nature of the change being implemented by this engagement does not significantly change or impact the existing live service'
     ],
     redioButonText:[
        'Yes',
        'No'
     ],
     dropdowhdata:[
        {name:'Very High',id:4},
        { name:'High',id:3},
        { name:'Medium',id:2},
        {name:'Low',id:1}
     ],
     reportBaseOnDataInput:'Based upon the data input in to the Complexity Input Sheet this project has been assessed to be of',
     textReport1:'The rationale for moderation of the complexity assessment for this project is:',
     textReport2:'Suggestion/ Planned action to improve the complexity score :',
     reportHeader:[
     
     ],
     reportFooter:[
     
     ],
     AccoudentButton:[
        {
           variant:'primary',
           size:'lg',
           buttonText:'save',
           type:'button',
           disabled:false
        },
        {
           variant:'primary',
           size:'lg',
           buttonText:'Next',
           right:'right',
           type:'submit'
        }
     ],
     serchButton:{
        variant:'primary',
        size:'lg',
        buttonText:'Back',
        type:'button'
     },
     serchButton2:{
        variant:'primary',
        size:'lg',
        right:'right',
        buttonText:'Search',
        type:'submit'
     },
     AccountOptionData:[
        'Tesco Plc',
        'Yorkshire Water Services Ltd',
        'UK Commercial Sector Sales'
     ],
     findAnOpportunity:"You can click upon one of the Opportunities displayed to select it",
     findAnOpportunityMessage: 'There are no opportunities that match your selection criteria. Please try again.',
     redOnlydataForToolBar:{
        'OCOD reference':'ALEA-6NW33',
        'Opportunity name':'Finance Transformation',
        'Nickname':'Richard',
        'Next assessment gate':'BCR0C'
     },
     fastTrackSubHeader:'If you can confirm that the opportunity meets all six of the "fast track" complexity assessment criteria please complete this form, otherwise click "Next" to access the Engagement Complexity form',
     logOutButton:[
      
      
      {
        variant:'danger',
        size:'sm',
        buttonText:'No',
        tabindex:2
     },
     {
        variant:'primary',
        size:'sm',
        buttonText:'Yes',
        right:'right',
        type:'button',
        tabindex:1,
        autoFocus:true,
        className:primary
       
     }],
      AssessmentButton:[
         {  
            variant:'primary',
            size:'lg',
            buttonText:'Continue with selection',
            type:'submit',
            tabIndex:1
         }
      ],
      ContinueWithSelectionButton:[
        {  
           variant:'primary',
           size:'lg',
           buttonText:'Continue with selection',
           type:'submit',
           tabIndex:1
        }
     ],
      reportData:['Assessment Complexity Report (PDF)','Unweighted Complexity Chart (JPEG)','Weighted Complexity Chart (JPEG)'],
      reportNormalAndFarst_Tital:"Download your Complexity Assessment",
      reportNormalAndFarst_Text:"Thank you, your assessment has been submitted",
      extReport:"Report successfully created",
      extReport_Tital:"Download your Report",
      helpTextForTrialButton:"When you use this trial feature it allows you to follow the create complexity assessment process without having to satisfy all of the mandatory data entry checks – it gives you an understanding of the functionality and ‘look and feel’. No complexity assessment data will be saved.",
      hoverTextForExtractReportBtn:"You can use Extract reports to either generate reports for a range of complexity assessments, or to select a specific complexity assessment and re-produce the existing complexity assessment outputs.",
      helpTextForOcodRef : "The complexity assessment needs to be created for a valid opportunity within OCOD. Please enter a valid OCOD reference, or enter an Opportunity name. Hint:You can also use the Search for opportunity button.",
      helpTextForOppName:'The complexity assessment needs to be created for a valid opportunity within OCOD. Please enter a valid Opportunity name, or enter an OCOD reference. Hint: You can also use the Search for opportunity button.',
      helpTextForNickname:'You can choose to give this complexity assessment a “nickname”, so you have something that is easy to remember for future reference.  Adding a nickname is not mandatory, you may leave this field blank',
      helpTextForAssessmentGate:'Please use the drop-down list to select the next business assurance gate (BCR, DCR) for this opportunity',
      helpTextForLogout:'Press Logout to close down and exit from the Engagement Complexity Tool',
      complexityLevel:{
         veryHigh:875,
         high:625,
         moderate:375,
         low:125
      },
      
extractReports:{

 helpOcod:"To narrow down your search you can select a specific OCOD opportunity by entering the OCOD Reference Number in this field, and then press ‘Next’. Hint: There is also a search feature to help you find a specific OCOD opportunity.",
 helpOppRef:"To narrow down your search you can select a specific OCOD opportunity by entering the OCOD Reference Name in this field, and then press ‘Next’. Hint: There is also a search feature to help you find a specific OCOD opportunity.",
 helpSector: "To narrow down your search you can select a specific sector from this drop-down list, and then press ‘Next’",
 helpAccount:"To further narrow down your search you can select a specific account from this drop-down list, and then press ‘Next’"


},

creatAssessement:{
    "OpportunityId":String,
    "NickName":String,
    "IsFastrack":Number,
    "GateId":Number,            
    "CompletedBy":String,
    "CalculatedComplexity":Number,
    "ModeratedComplexity":Number,
    "ModerationReason":String,
    "Status":Number,
    "Remarks": String,
    "CreatedBy":String,
    "ModifiedBy":String,           
    "IsActive":Number,
    "tblAssessmentEntries":[
        {
            "SubFactorId":Number,
            "UwComplexityScore" :Number,
            "WComplexityScore" :Number,
            "Remark" :String,
            "IsActive":Number,
            "CreatedBy":String
        },

        {
            "SubFactorId":2 ,
            "UwComplexityScore" :2,
            "WComplexityScore" :2,
            "Remark" :"fasdf",
            "IsActive":2,
            "CreatedBy":"NK"  
        }

        ]

     },
     saveConfirmation:"Do you want to save your changes?",
     trialMessageForOppSelection:<div><p>TRIAL FEATURE:<br/><br/>When you create or edit a complexity assessment then it is <u>mandatory</u> that both a valid OCOD opportunity has been selected and also that the Next assessment gate has been selected.<br/><br/>Entering a Nickname for the opportunity is optional.<br/><br/>You can continue to use the Trial Feature without selecting a valid OCOD opportunity or Next assessment gate.</p></div>,
     msgAssesmentNotFasttrack:"This complexity assessment does not qualify as a Fast track complexity assessment.\n \
     Therefore you will need to create a full complexity assessment.",
     complexityLevelText:{
        veryHigh:'Very High',
        high:'High',
        moderate:'Moderate',
        low:'Low'
     },
     helpTextForSectorDropDown:'To narrow down your search you can select a specific sector from this drop-down list, and then press ‘Search’',
     helpTextForAccountDropDown:'To further narrow down your search you can select a specific account from this drop-down list, and then press ‘Search’',
     saveConfirmationMessage:'Your changes have been saved.',
     reportConfirmationModal:'This form is usually used to create a report containing the details of a number of complexity assessments that match the selection criteria that you have entered.\nYou can press ‘Select all’ or select the individual complexity assessments that you require for your report one by one.\nIf you select a single complexity assessment from the table then you will be able to download the complexity assessment report and graphs for that particular complexity assessment.',
     trialMessageForAssessmentSubmission:'When you create a complexity assessment you will be required to provide an explanation as to why if you have moderated the complexity score.\nYou will also be required to provide some text to explain what actions are appropriate to improve (i.e. reduce) the complexity score.',
     showValidationFailMessage:'Please provide mandatory information.',
    tblAssessmentEntries:[
    {"subFactorId":1,"Factor":1,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":2,"Factor":1,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":3,"Factor":2,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":4,"Factor":2,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":5,"Factor":2,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":6,"Factor":2,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":7,"Factor":2,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":8,"Factor":2,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":9,"Factor":3,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":10,"Factor":3,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":11,"Factor":3,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":12,"Factor":3,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":13,"Factor":4,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null},
    {"subFactorId":14,"Factor":4,"uwComplexityScore":0,"wComplexityScore":0,"remark":"","isActive":1,"createdBy":null}],

    tblAssessmentEntriesBlank:[
        {"subFactorId":1,"Factor":1,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":2,"Factor":1,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":3,"Factor":2,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":4,"Factor":2,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":5,"Factor":2,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":6,"Factor":2,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":7,"Factor":2,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":8,"Factor":2,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":9,"Factor":3,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":10,"Factor":3,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":11,"Factor":3,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":12,"Factor":3,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":13,"Factor":4,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null},
        {"subFactorId":14,"Factor":4,"uwComplexityScore":0,"wComplexityScore":0,"remark":null,"isActive":1,"createdBy":null}],
    logoutText:"You shall now exit the Engagement Complexity Tool.\nIf you do not need to log on to the Engagement Complexity Tool again please close the tab on your browser.",
    selectText:"When you press the Select button you will be able to select the Complexity score from a table",
    nextbuttonText:"When you press the Next button this “panel” will close, returning you to the main Complexity assessment form",
    nextbuttonSubnit:"When you press the Next button this “panel” will close, and you will be taken to the next page to moderate and submit your complexity assessment",
    existingOppMessage:"The assessment for selected opportunity and gate already exists. If you wish to update it, please go back and select \'Update complexity assessment\' option.",
    searchPageText:"Press 'Continue with selection' to generate a report containing these opportunity",
    trialMessageForNavToModScreen:"When you create a complexity assessment you will be required to select a Complexity score for each of the (14) Complexity factors.\nYou will also need to provide an explanation as to why have selected that particular Complexity score.",
    checboxLeble:"Thank you. Please don’t tell me again",
    loginConformationMassage:"The Engagement Complexity Assessment Tool is the leading risk indicator tool that is used to determine the appropriate level of surveillance and governance to ensure that we deliver in a predictable and profitable manner.\nPlease refer to CP-002-WI-001 Engagement Complexity Tool Work Instruction on iQ for guidance and/or use the help functions within the application.\nThe completion of the tool is one of the first stages of our approach to risk management \(please refer to the CP-O02-FR-001 Enterprise Risk Management Framework on iQ\).\nWhere we use the term \“Engagement\” this means a contractual relationship that any part of Sopra Steria UK enter into with a client.\nThis places price\; scope\; time\; quality\; and\/or acceptance criteria obligations on us that - if not effectively managed - will result in some form of financial or reputational damage.",
    createUpdateMessage:"Whilst the Engagement Complexity Tool has been designed for “internal users” (i.e. users who are employed by Sopra Steria and have a valid AD-One user name and password) it is absolutely critical that data of a particularly sensitive or classified nature should not be included. \nWhere necessary, users are reminded that all data that is entered to create and update each complexity assessment is suitably obfuscated in order to protect sensitive information and to ensure that all client and data confidentiality obligations are strictly adhered to.",
    normalComplexityMsg:"Please complete each of the 14 complexity factors contained within the ‘panels’ above, including the Rationale for the complexity score in each case. You can then press Next on the Capability Factors panel to proceed to the Moderate & Submit page.",
    warningMassage:" WARNING: \n This is a management tool and data of a particularly sensitive or classified nature should not be included. \n Where necessary\, please ensure that inputs are suitably obfuscated in order to protect sensitive information.",
    complexityRationle:'Rationale for complexity score: ',
    complexityScore:'Complexity score : ',
    assessementGetIdChange:'When you change the next assessment gate a new complexity assessment shall be created for the opportunity,using the new next assessment gate. \n Do you want to continue?',
    reportConformationMassage:'This form is usually used to create a report containing the details of a number of complexity assessments that match the selection criteria that you have entered.\n You can press ‘Select all’ or select the individual complexity assessments that you require for your report one by one.\nIf you select a single complexity assessment from the table then you will be able to download the complexity assessment report and graphs for that particular complexity assessment.',
    fastTrackNotSaved:"This complexity assessment has not been created. The data that you have entered shall not be saved.",
    trialMessege203:"TRIAL FEATURE:\n This trial feature allows you to follow the create complexity assessment process without having to satisfy all of the mandatory data entry checks – it has been designed to give you an understanding of the functionality and the ‘look and feel’ of the application.\n \ You will not actually create a complexity assessment on the system and none of the data that you enter will be saved.\n When you complete the process you will be able to download a sample complexity assessment report.\n \ Please take advantage of the Help on this page links on each of the pages to also help you understand how the application works.",
    trialMessege315A:"TRIAL FEATURE:\n When you are either creating or editing a complexity assessment and you press the Back button on this page then you will be asked whether or not you want to save your changes before you are returned back to the Home Page.",
    trialMessege504:"TRIAL FEATURE:\n Unless you can answer “yes” to each of the six questions on this page then the complexity assessment does not meet the “Fast Track” complexity assessment criteria. \n Therefore you will need to create a full complexity assessment.",
    trialMessege505:"TRIAL FEATURE:\n Because you have answered “yes” to each of the six questions on this page then the complexity assessment meets the “Fast Track” complexity assessment criteria. \n Therefore you will proceed straight on to the Moderate & Submit page to complete your complexity assessment.",
    trialMessege620:<div><p>TRIAL FEATURE: <br/><br/>When you create a Fast Track complexity assessment the complexity always defaults to Low. <br/><br/> On this page you can <i>moderate</i> the complexity assessment to Moderate or High, but you will be required to provide an explanation as to why if you have moderated the complexity score. <br/><br/> You are also required to provide some text to explain what actions are appropriate to improve (i.e. reduce) the complexity score. <br/><br/><br/> Having submitted your complexity assessment all changes have been saved and your complexity assessment has been saved on to the system.<br/><br/> You are now able to download, save and share the complexity assessment report.</p></div>,
    trialMessege920:<div><p>TRIAL FEATURE: <br/><br/>When you create an engagement complexity assessment then the tool calculates the engagement complexity rating using an algorithm, based upon the 14 complexity scores that have been selected by the user.<br/>On this page you can <i>moderate</i> the complexity assessment, but you will be required to provide an explanation as to why if you have moderated the complexity score.<br/><br/>You are also required to provide some text to explain what actions are appropriate to improve (i.e. reduce) the engagement complexity.<br/> Having submitted your complexity assessment all changes have been saved and your complexity assessment has been saved on to the system.<br/>You are now able to download, save and share the complexity assessment report in a PDF format.<br/>You are also able to download, save and share the <i>weighted</i> and the <i>unweighted</i> complexity graphs in a bit map format.</p></div>,
    trialMessege811:"TRIAL FEATURE:\n When you create a complexity assessment you will be required to select a Complexity score for each of the (fourteen) Complexity factors.\n \ This requires you to open up each of the four “panels” and select the Complexity score for each of the Complexity factors within the panel.\n \ You will also need to provide an explanation in each case as to why have selected that particular Complexity score.",
    trialMessege1013:<div><p>TRIAL FEATURE: <br/><br/>At this point you have created an engagement complexity assessment.<br/>This was saved on to the system as you pressed the Next button on the Moderate & Submit page.<br/>On this page you have been able to download, save and share the complexity assessment report in a PDF format.<br/><br/>You have pressed the Home button, so you will now be navigated back to the Home page.<br/><br/>Users are able to update the engagement complexity assessments that have been created via the Update complexity assessment button on the Home page.<br/>It is also possible to select an existing complexity assessment and get back to this page to download the complexity assessment report again.<br/><br/><u><b>You are no longer in “trial mode”</b></u>.</p></div>,

    fasttrackAckMsg : "You have moderated this engagement as having a complexity level greater than Low.\nOn this basis please carefully consider the factors that introduce increased complexity for this engagement and the need to complete a full complexity assessment.",
    fullAckMsg : "You have moderated the engagement complexity.\nPlease follow the guidance for moderation provided within your complexity assessment report.",
    networkError : "Network error has occurred. Please try after some time."
     
}
export default litral; 