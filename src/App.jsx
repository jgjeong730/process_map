import { useState, useEffect } from 'react'
import { stages } from './data/stages'
import ProcessMap from './components/ProcessMap'
import StagePanel from './components/StagePanel'

const STORAGE_KEY = 'process-map-checks'

function loadChecks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export default function App() {
  const [checks, setChecks] = useState(loadChecks)
  const [activeId, setActiveId] = useState(1)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checks))
  }, [checks])

  function toggleCheck(itemId) {
    setChecks(prev => ({ ...prev, [itemId]: !prev[itemId] }))
  }

  function resetAll() {
    if (window.confirm('모든 체크 항목을 초기화할까요?')) {
      setChecks({})
    }
  }

  const allItems = stages.flatMap(s => s.checklist)
  const totalDone = allItems.filter(item => checks[item.id]).length
  const totalCount = allItems.length
  const overallPct = Math.round((totalDone / totalCount) * 100)

  const activeStage = stages.find(s => s.id === activeId)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        padding: '24px 20px',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Header */}
        <header
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                🗺️ 앱 제작 스탠다드 프로세스맵
              </h1>
              <p style={{ fontSize: '13px', color: '#64748B' }}>
                기획부터 배포까지 — 단계별 체크리스트로 진행상황을 관리하세요
              </p>
            </div>
            <button
              onClick={resetAll}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                background: '#F8FAFC',
                fontSize: '12px',
                color: '#64748B',
                fontWeight: '500',
                transition: 'all 0.15s',
              }}
            >
              초기화
            </button>
          </div>

          {/* Overall progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1, height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${overallPct}%`,
                  background: 'linear-gradient(90deg, #7C3AED, #2563EB)',
                  borderRadius: '4px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#374151', whiteSpace: 'nowrap' }}>
              전체 {overallPct}% ({totalDone}/{totalCount})
            </div>
          </div>
        </header>

        {/* Process Map */}
        <ProcessMap
          stages={stages}
          activeId={activeId}
          checks={checks}
          onSelect={setActiveId}
        />

        {/* Stage Detail Panel */}
        <StagePanel
          stage={activeStage}
          checks={checks}
          onToggle={toggleCheck}
        />

        <footer style={{ textAlign: 'center', fontSize: '12px', color: '#CBD5E1', paddingBottom: '8px' }}>
          진행 상태는 자동으로 저장됩니다
        </footer>
      </div>
    </div>
  )
}
