$ErrorActionPreference = 'Stop'
$docPath = (Resolve-Path 'Fix_It_Marketplace_Thesis.docx').Path

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $doc = $word.Documents.Open($docPath, $false, $true)
    
    # Force pagination computation
    $doc.Repaginate()
    
    $pages = $doc.ComputeStatistics(2) # wdStatisticPages = 2
    $words = $doc.ComputeStatistics(0) # wdStatisticWords = 0
    $paragraphs = $doc.ComputeStatistics(4) # wdStatisticParagraphs = 4
    
    Write-Output "TOTAL_PAGES: $pages"
    Write-Output "TOTAL_WORDS: $words"
    Write-Output "TOTAL_PARAGRAPHS: $paragraphs"
    
    # Check sections
    for ($i = 1; $i -le $doc.Sections.Count; $i++) {
        $sec = $doc.Sections.Item($i)
        $secPages = $sec.Range.ComputeStatistics(2)
        Write-Output "SECTION_$i PAGES: $secPages"
    }

    foreach ($p in $doc.Paragraphs) {
        $text = $p.Range.Text.Trim()
        if ($text -in @('CHAPTER I', 'CHAPTER II', 'CHAPTER III', 'CHAPTER IV', 'CHAPTER V', 'REFERENCES', 'APPENDIX A - CORE SOURCE CODE LISTINGS AND REPOSITORY REPRODUCIBILITY GUIDE')) {
            $pNum = $p.Range.Information(3) # wdActiveEndPageNumber
            $adjNum = $p.Range.Information(1) # wdActiveEndAdjustedPageNumber
            Write-Output "$text -> Physical Page: $pNum | Numbered Page: $adjNum"
        }
    }

    $doc.Close($false)
    $word.Quit()
} catch {
    Write-Output "WORD_AUTOMATION_NOTE: $($_.Exception.Message)"
}
