const fs = require('fs')
const docxParser = require('docx-parser');

try {
    docxParser.parseDocx("Personenbeforderungsgesetz_PBefG.docx", (extractedData) => {
        const questionsAndAnswers = []
        const lines = extractedData.split('\n')
        lines.forEach((line, index) => {
            if (line.trim().endsWith('?')) {
                const question = lines[index]
                const answers = []
                let cursor = index
                let keepParsing = true

                do {
                    const currentLine = lines[cursor + 1]
                        if (/\d/.test(currentLine[0]) || currentLine[0] === '-') { 
                            answers.push(currentLine)
                        } else {
                            keepParsing = false
                        }
                    cursor += 1
                  } while (keepParsing);

                  questionsAndAnswers.push({
                      question,
                      answers
                  })
            }
        })
        fs.writeFile('result.json', JSON.stringify(questionsAndAnswers, null, 2), (error) => {
            if (error) throw new Error(error)
            console.log('Data extracted successfully from the word Document 🎉 Check the result.json file 😄')
        })
})
} catch (e) {
    console.log({
        message: e.message,
        stack: e.stack
    })
}
