// Numbered lists - Add parent number in sub number
// Import from 'docx' rather than '../build' if you install from npm
import * as fs from "fs";
import { AlignmentType, convertInchesToTwip, Document, HeadingLevel, Packer, Paragraph } from "../build";

const doc = new Document({
    numbering: {
        config: [
            {
                levels: [
                    {
                        level: 0,
                        format: "decimal",
                        text: "%1",
                        alignment: AlignmentType.START,
                        style: {
                            paragraph: {
                                indent: { left: convertInchesToTwip(0.5), hanging: 260 },
                            },
                        },
                    },
                    {
                        level: 1,
                        format: "decimal",
                        text: "%1.%2",
                        alignment: AlignmentType.START,
                        style: {
                            paragraph: {
                                indent: { left: 1.25 * convertInchesToTwip(0.5), hanging: 1.25 * 260 },
                            },
                            run: {
                                bold: true,
                                size: 18,
                                font: "Times New Roman",
                            },
                        },
                    },
                ],
                reference: "my-number-numbering-reference",
            },
        ],
    },
});

doc.addSection({
    children: [
        new Paragraph({
            text: "How to make cake",
            heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
            text: "Step 1 - Add sugar",
            numbering: {
                reference: "my-number-numbering-reference",
                level: 0,
            },
        }),
        new Paragraph({
            text: "Step 2 - Add wheat",
            numbering: {
                reference: "my-number-numbering-reference",
                level: 0,
            },
        }),
        new Paragraph({
            text: "Step 2a - Stir the wheat in a circle",
            numbering: {
                reference: "my-number-numbering-reference",
                level: 1,
            },
        }),
        new Paragraph({
            text: "Step 3 - Put in oven",
            numbering: {
                reference: "my-number-numbering-reference",
                level: 0,
            },
        }),
        new Paragraph({
            text: "How to make cake",
            heading: HeadingLevel.HEADING_1,
        }),
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
